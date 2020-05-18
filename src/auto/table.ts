import * as fs from 'fs-extra';
import * as path from 'path';

import { Just, Nothing, isJust } from './../datastruct/maybe';
import { navTo, selectDropDownValue, useButton } from './selectors';

import { BrowserObject } from 'webdriverio';
import { IAuctionDetails } from '../types/IAuctionDetails';
import { IColumnDefintion } from '../types/IColumnDefintion';
import { PromiseOp } from './../datastruct/promise';
import { compl } from '../fp/compl';
import { flip } from './../fp/flip';
import { isEmpty } from './../text/isEmpty';
import { isUndefined } from './../text/substring';
import { padZero } from '../text/padZero';
import { prepend } from './../text/append';

export const OUTPUT_PATH = {
    AUCTIONDATA_OUTPUT: (cityName: string) => 
        path.resolve(__dirname, 'data', `${cityName}.json`)
}
function toColumnDef(id: string, name: keyof IAuctionDetails, index?: number) {
    return { id, name, index: !isUndefined(index) ? Just(index) : Nothing<number>() }
}

const column1 = toColumnDef('_Label1', 'customerName')
const column2 = toColumnDef('_Label3', 'auctionDate')
const column3 = toColumnDef('_Label4', 'propertyName')
const column4 = toColumnDef('_Label5', 'propertyAddress')
const column5 = toColumnDef('_Label6', 'propertyState')
const column6 = toColumnDef('_Label7', 'propertyZip', 0)
const column7 = toColumnDef('_Label9', 'propertyPhone')
const column8 = toColumnDef('_Label7', 'contents', 1)

function rowID(rowNumber: number, ending: string) {
    const rowBase = `dgAuctionDetails_ctl`;
    return prepend("#")([rowBase, padZero(2)(rowNumber.toString()), ending].join(''))
}

function setKey(obj: { [n: string]: any }) {
    return function(key: string) {
        return function(value: any) {
            obj[key] = value;
            return obj;
        }
    }
}
const setKeySafe = setKey({});

export async function processColumn(rowNumber: number, def: IColumnDefintion) {
    return async function(b: BrowserObject) {
        const { id, name, index } = def;
        const fullName = rowID(rowNumber, id);
        const ele = await (isJust(index) ? b.$$(fullName) : b.$(fullName))
        const ele2 = isJust(index) ? (ele as WebdriverIO.ElementArray)[index.value] : (ele as any as WebdriverIO.Element);
        const text = await ele2.getText();
        const obj: KeyedObject<string> = {};
        obj[name] = text;
        return obj;
    }
}

function funcAp<T, U>(f: (x: T) => U) {
    return function(x: T) {
        return f(x);
    }
}
const pipe = <T>(x: T) => flip(funcAp)(x);

async function processRow(browser: WebdriverIO.BrowserObject, num: number): Promise<IAuctionDetails[]> {
    function mutateResult(key: keyof IAuctionDetails, value: string, accum: IAuctionDetails): IAuctionDetails {
        accum[key] = value;
        return accum;
    }

    async function guard(cc: number) {
        const ele = await browser.$$(rowID(cc, '_Label3'));
        return compl(isEmpty)(ele);
    }
    const columns: IColumnDefintion[] = [ column1, column2, column3, column4, column5, column6, column7, column8 ];
    if (await guard(num)) {
        const accum = {};
        columns.map(async function(def: IColumnDefintion) {
            const { id, name, index } = def;
            const element = isJust(index) ? (await browser.$$(rowID(num, id)))[index.value] 
                : (await browser.$(rowID(num, id)));
            const value = await element.getText();
            mutateResult(name, value, accum as any);
        });
        return [ accum as any, ...(await processRow(browser, num + 1)) ]
    }
    return []
}

export async function processTable(browser: WebdriverIO.BrowserObject) {
    const current = 2;
    return processRow(browser, current);
}''

export async function processPage(browser: WebdriverIO.BrowserObject, city: string) {
    await navTo(browser, 'https://publicstorageauctions.com/');
    await selectDropDownValue('ddlState')(browser)('CA');
    await selectDropDownValue('ddlCity')(browser)(city);
    await useButton(browser, 'btnSubmit');

    const result = await processTable(browser);
    console.log(`processed: ${result.length}`);
    await fs.writeFile(OUTPUT_PATH.AUCTIONDATA_OUTPUT(city), JSON.stringify(result))
    return result;
}

