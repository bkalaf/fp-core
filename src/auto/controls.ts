import * as path from 'path';

import {
	AUCTION_URL,
	CITY_DDL,
	IColumnParameters,
	STATE_DDL,
	STATE_VALUE,
	SUBMIT_BUTTON,
	SUCCESSFUL_INDICATOR,
	TABLE_START,
	UNSUCCESSFUL_INDICATOR,
	columnMapping,
	xformDetails
} from './../api/ps/auctions';
import { BrowserObject, remote } from 'webdriverio';
import { cities, counties } from '../api/ps/cityList';

import { IAuctionDetails } from './../types/IAuctionDetails';
import { composeL } from '../fp/compose';
import { either } from '../fp/logic/either';
import { not } from '../fp/logic/not';
import { objMerge } from './objMerge';
import { padZero } from '../text';
import { toClassSelector } from './toClassSelector';
import { toIDSelector } from './toIDSelector';
import { writeDataToFile } from './writeData';

const sync = require('@wdio/sync').default;


const onChange = (name: string) => (x: number) => setTimeout('__doPostBack(\'${name}\',\'\')', x);
function generateNextRowTester(current: number) {
	return generateNextColumnID(current, '_Label1');
}
function generateNextColumnID(current: number, suffix: string) {
	return toIDSelector([TABLE_START, padZero(2)(current.toString()), suffix].join(''));
}

function invertObj(obj: { [name: string]: string }): { [name: string]: string } {
	return Object.keys(obj).map(k => ({ [obj[k]]: k })).reduce(objMerge, {}) as { [name: string]: string };
} 
function getCountyAbbreviationFromLongName(county: string) {
	const result = invertObj(counties)[county];
	console.log(`getCountyAbbreviationFromLongName: county: ${county} result: ${result} inverted: ${JSON.stringify(invertObj(counties))}`)
	return invertObj(counties)[county];
	// return Object.entries(counties).filter(([k, v]: [string, string]) => eq(county)(v)).map(([k,v]:[string, string]) => k)[0];
}
function getCountyAbbreviationFromCityLongName(city: string): string {
	const fullText = (cities as any)[city];
	console.log(`fullText: ${fullText}`);
	return getCountyAbbreviationFromLongName(fullText);
}
function calculateOutputFileName(cityName: string) {
	const countyAbbrev = getCountyAbbreviationFromCityLongName(cityName);
	const normalizedName = normalizeCityName(cityName);
	const fn = [normalizedName, '.json'].join('');
	console.log(`cityName: ${cityName} countryAbbrev: ${countyAbbrev}, normalized: ${normalizedName}, fn: ${fn}`)
	return path.resolve(process.cwd(), 'data', countyAbbrev, fn);
}

function normalizeCityName(name: string) {
	return name.toLowerCase().replace(' ', '_');
}

function constructPropertyObj(n: string, converter: Function, result: string): { [x: string]: any; } {
	return ({ [n]: converter(result) });
}
export async function doit(cities: string[]) {
	async function inner2(browser: BrowserObject) {
		
	browser.url(AUCTION_URL);
	browser.$(toIDSelector(STATE_DDL)).selectByAttribute('value', STATE_VALUE)
	const exe = browser.execute(onChange(STATE_DDL), 0);
	console.log(`state selected`);
	
	const result = cities.map(async city => {
		console.log(`processing: ${city}`)
		browser.$(toIDSelector(CITY_DDL)).selectByAttribute('value', city);
		const exe = browser.execute(onChange(CITY_DDL), 0);

		browser.$(toIDSelector(SUBMIT_BUTTON)).click();
		while (not(browser.$(toClassSelector(UNSUCCESSFUL_INDICATOR)).isExisting() || browser.$(toIDSelector(SUCCESSFUL_INDICATOR)).isExisting())) {
			browser.pause(1000);
			console.log('pausing... 1 sec');
		}
		const hasNoRecords = browser.$(toClassSelector(UNSUCCESSFUL_INDICATOR)).isExisting();
		let data: {}[] = [];
		if (hasNoRecords) {
			console.log('no records found');			
		} else {
			console.log('records found');
			let current = 2;
			while (browser.$(generateNextRowTester(current)).isExisting()) {
				console.log(`row ${current}: exists`);
				const cols = Object.entries(columnMapping(b)).map(([k, v]: [string, IColumnParameters]) => {
					const { suffix, index, converter } = v;
					const value = converter(browser.$$(generateNextColumnID(current, suffix))[index].getText())
					return { [k]: value }
				});
				const row = cols.reduce(objMerge);
				data = [ xformDetails(row as IAuctionDetails, city), ...data];
				current = current + 1;
			}
			console.log(`row ${current} does not exist`);
			console.log(`${city} processed: ${current - 2} rows`);
			console.log(`data rows: ${data.length}`);
		}
		const cityData = { [normalizeCityName(city)]: data }
		const wf = composeL(writeDataToFile(cityData),calculateOutputFileName);
		await wf(city);
		return cityData;
	})
	const fullData = await Promise.all(result);
	const outputfn = `${Date.now().toString()}.json`;
	const fullpath = path.resolve(process.cwd(), 'data', outputfn)
	await writeDataToFile(fullData.reduce(objMerge, {}))(fullpath);
	}
	async function inner(browser: BrowserObject) {
		return sync(() => inner2(browser))
	}
	let b = remote({
		maxInstances: 5,
		capabilities: {
			browserName: 'chrome'
		}
	});
	console.log(`browser: ${b}`)
	if (b instanceof Promise) {
		b = await b;
	}
	await inner(b);	
	await b.deleteSession();	
}	
