import { curry, curry3 } from 'src/fp/curry';

import { IColumnDefintion } from './../types/IColumnDefintion';
import Text from '../text';
import { fst } from 'src/tuple/fst';
import { isUndefined } from './../text/substring';
import { prepend } from './../text/append';
import { snd } from 'src/tuple/snd';

export interface IColumnParameters {
    suffix: string;
    index: number;
    browser: WebdriverIO.BrowserObject;
}

export function asColumnDef(browser: WebdriverIO.BrowserObject, suffix: string, index: number = 0): IColumnParameters {
    return { suffix, index, browser }
}
export function constructId(left: string, ix: number, right: string) {
    return Text.join(ix.toString())(left)(right);
}

export function executeColumn(param: IColumnParameters) {
    return async function(rowNumber: number) {
        const id = curry3(constructId)(`dgAuctionDetails_ctl`)(rowNumber)(param.suffix)
        const ID = prepend('#')(id)
        const elements = await param.browser.$$(ID)
        const element = elements[param.index];
        const text = await element.getText()
        return text;
    }
}

const columnMapping = (b: WebdriverIO.BrowserObject) => ({
    customerName: asColumnDef(b, '_Label1'),
    auctionDate: asColumnDef(b, '_Label3'),
    propertyName: asColumnDef(b, '_Label4'),
    propertyAddress: asColumnDef(b, '_Label5'),
    propertyState: asColumnDef(b, '_Label6'),
    propertyZip: asColumnDef(b, '_Label7'),
    propertyPhone: asColumnDef(b, '_Label9'),
    contents: asColumnDef(b, '_Label7', 1)
})

export async function execute(b: WebdriverIO.BrowserObject, rowNumber: number) {
    const mapping: KeyedObject<IColumnParameters> = columnMapping(b);
    const data: KeyedObject<string> = {};
    Object.keys(mapping).forEach(async(n) => data[n] = await executeColumn(mapping[n])(rowNumber))
    return data;
}

export async function processTable(b: WebdriverIO.BrowserObject) {
    async function inner(current: number): Promise<ITuple<boolean, KeyedObject<string>>> {
        const data = await execute(b, current)
        const next = current + 1;
        const nextID = prepend('#')(curry3(constructId)(`dgAuctionDetails_ctl`)(next)('_Label1'));
        const result = await b.$$(nextID) 
        return [ isUndefined(result[0]), data]
    }
    async function cont(rowNum: number, acc: any[]): Promise<KeyedObject<string>[]> {
        const output = await inner(rowNum);
        if (fst(output)) {
            return cont(rowNum + 1, [ snd(output), ...acc ])
        }
        return [ snd(output), ...acc ]
    }
    return cont(2, []);
}