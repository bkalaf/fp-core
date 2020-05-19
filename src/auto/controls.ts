import { PromiseOp, PromiseOps } from './../datastruct/promise';
import * as path from 'path';

import {
	AUCTION_URL,
	CITY_DDL,
	CITY_VALUE,
	IColumnParameters,
	STATE_DDL,
	STATE_VALUE,
	SUBMIT_BUTTON,
	TABLE_START,
	columnMapping
} from './../api/ps/auctions';
import { BrowserObject, remote } from 'webdriverio';

import { compl } from '../fp/compl';
import { eq } from '../fp/eq';
import { padZero } from '../text';
import { toIDSelector } from './toIDSelector';
import { writeData } from './writeData';

const onChange = (name: string) => (x: number) => setTimeout('__doPostBack(\'${name}\',\'\'_', x);
const onchange = onChange('ddlState');
const onchange2 = onChange('ddlCity\')
export async function doCity(browser: BrowserObject, cityName: string) {
	async function nextRow({ b, current, acc }: { b: BrowserObject; current: number; acc: Object[]; }): Promise<Object[]> {
		const nextID = ["#", TABLE_START, padZero(2)(current.toString()), '_Label1' ].join("")
		
		try {
			console.log(`in try`)
			const element = await b.$(nextID)
			await element.waitForExist({ timeout: 5000 });
		} catch (e) {
			console.error(`row ${current} not found`);
			return acc;
		}
		const mapping = columnMapping(b);
		const result = Object.keys(mapping).map(async (n: string) => {
			const value: IColumnParameters = (mapping as any)[n];
			const colID = ["#", TABLE_START, padZero(2)(current.toString()), value.suffix ].join("")
			const element = await browser.$$(colID);
			const ele = element[value.index]
			const result = await ele.getText();
			return constructPropertyObj(n, value, result)
		});
		const result2 = await PromiseOp.sequence(result);
		const data = result.reduce(Object.assign, {});
		console.log(`result: ${JSON.stringify(data)}`)
		return nextRow({ b, current: current + 1, acc: [(data as any), ...acc] });
	}
	const ele2 = await browser.$(toIDSelector(CITY_DDL));
	await ele2.waitForExist();
	await ele2.selectByAttribute('value', cityName);
	await browser.execute(onChange(CITY_DDL), 0);
    await browser.pause(4000);

	const ele3 = await browser.$(toIDSelector(SUBMIT_BUTTON));
	ele3.waitForClickable();
	ele3.click();
	const normalizeCityName = normalizeNameOfCity()
	const outputFn = path.resolve(__dirname, 'data', `${normalizeCityName(cityName)}.json`);
	
	try {
		const noRecords = browser.$('.searchmessage')
		const table = browser.$(generateFirstRowID())
		const winner = await Promise.race([noRecords, table]);
		console.log(`racing: .searchmessage vs. ${table}`)
		const winText = await winner.getText()
		console.log(`${cityName}:: ${winText}`);
		const result = await (compl(eq("No record(s) found."))(winText) ?			
					   nextRow({ b: browser, current: 2, acc: [] }) :
					   Promise.resolve([]));
		await writeData({ [cityName]: result })(outputFn)
			
	} catch (e) {
		console.log(`${normalizeCityName(cityName)} failed. ${e.message}`);
	}
}

function normalizeNameOfCity() {
	return (name: string) => name.toLowerCase().replace(' ', '_');
}

function generateFirstRowID(): string {
	return ["#", TABLE_START, "02", "_Label1"].join("");
}

function constructPropertyObj(n: string, value: IColumnParameters, result: string): { [x: string]: any; } {
	return ({ [n]: value.converter(result) });
}

export async function doit(cities: string[]) {

	const browser = await ((remote({
		maxInstances: 5,
		capabilities: {
			browserName: 'chrome'
		}
	}) as any) as Promise<BrowserObject>);
	await browser.url(AUCTION_URL);
	const ele = await browser.$(toIDSelector(STATE_DDL));
	await ele.waitForExist();
    await ele.selectByAttribute('value', STATE_VALUE);
	await browser.execute(onchange, 0);

	for (let index = 0; index < cities.length; index++) {
		const city = cities[index];
		console.log(`awaiting: ${city}`)
		await doCity(browser, city);
	}
		
}	
