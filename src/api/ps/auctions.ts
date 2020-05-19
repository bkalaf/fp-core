import { composeL } from "../../fp/compose";
import { identity } from "../../fp/identity";

export const AUCTION_URL = 'https://www.publicstorageauctions.com/';
export const STATE_DDL = 'ddlState';
export const CITY_DDL = 'ddlCity';
export const SUBMIT_BUTTON = 'btnSubmit';

export const STATE_VALUE = 'CA';
export const CITY_VALUE = 'San Diego';

export const TABLE_START = `dgAuctionDetails_ctl`

export interface IColumnParameters {
    suffix: string;
    index: number;
    browser: WebdriverIO.BrowserObject;
    converter: Function;
}
function asColumnDef(browser: WebdriverIO.BrowserObject, suffix: string, 
    index: number = 0, converter: Function = identity): IColumnParameters {
    return { suffix, index, browser, converter }
}
const newDate = (x: number) => new Date(x);
export const columnMapping = (b: WebdriverIO.BrowserObject) => ({
    customerName: asColumnDef(b, '_Label1'),
    auctionDate: asColumnDef(b, '_Label3', 0, composeL(newDate, Date.parse)),
    propertyName: asColumnDef(b, '_Label4'),
    propertyAddress: asColumnDef(b, '_Label5'),
    propertyState: asColumnDef(b, '_Label6'),
    propertyZip: asColumnDef(b, '_Label7'),
    propertyPhone: asColumnDef(b, '_Label9'),
    contents: asColumnDef(b, '_Label7', 1)
})