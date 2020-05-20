import { IAuctionDetails } from './../../types/IAuctionDetails';
import { composeL } from "../../fp/compose";
import { identity } from "../../fp/identity";
import { objMerge } from '../../auto/objMerge';
import { prepend } from './../../text/append';
import { remove } from '../../text/append';
import { splitAt } from '../../text';

export const AUCTION_URL = 'https://www.publicstorageauctions.com/';
export const STATE_DDL = 'ddlState';
export const CITY_DDL = 'ddlCity';
export const SUBMIT_BUTTON = 'btnSubmit';

export const STATE_VALUE = 'CA';
export const CITY_VALUE = 'San Diego';

export const TABLE_START = `dgAuctionDetails_ctl`
export const UNSUCCESSFUL_INDICATOR = 'searchmessage'
export const SUCCESSFUL_INDICATOR = [ TABLE_START, "02", "_Label1"].join("");

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

export const columnMapping = (b: WebdriverIO.BrowserObject): AssociationMap<IAuctionDetails, IColumnParameters> => ({
    customerName: asColumnDef(b, '_Label1'),
    auctionDate: asColumnDef(b, '_Label3', 0, composeL(newDate, Date.parse)),
    propertyName: asColumnDef(b, '_Label4'),
    propertyAddress: asColumnDef(b, '_Label5'),
    propertyState: asColumnDef(b, '_Label6'),
    propertyZip: asColumnDef(b, '_Label7'),
    propertyPhone: asColumnDef(b, '_Label9'),
    contents: asColumnDef(b, '_Label7', 1)
})

interface IPropertyDetails {
    facilityNumber: number;
    facilityLongName: string;
}
interface IRenterDetails {
    renterName: string;
    unitNumber: string;
}
export function tupleMap<T, U, V, W>([f,g]: ITuple<(x: T) => U, (x: V) => W>, [x, y]: ITuple<T, V>): ITuple<U, W> {
    return [f(x), g(y)];
}
export function parseChain(preprocess: (x: string) => string, splitter: (s: string) => string[], postprocess: (s: string) => string) {
    return composeL((x: string[]) => x.map(postprocess), composeL(splitter, preprocess));
}
export function parseContents(auctionDetails: IAuctionDetails, key: keyof IAuctionDetails) : string[] {
    const preprocess = remove('\n')
    const splitter = splitAt(',');
    const postprocess = remove(' ');
    return parseChain(preprocess, splitter, postprocess)(auctionDetails[key]);
}
export function parseCustomerName(auctionDetails: IAuctionDetails, key: keyof IAuctionDetails): IRenterDetails {
    const [renterName, unitNumber] = parseChain(identity, splitAt(' - '), remove('Unit #'))(auctionDetails[key]);
    return { renterName, unitNumber }
}
export function parsePropertyName(auctionDetails: IAuctionDetails, key: keyof IAuctionDetails): IPropertyDetails {
    const converters: ITuple<(x: string) => number, (s: string) => string> = [ (x: string) => Number.parseInt(x), identity ];
    const strings = splitAt(" - ")(auctionDetails[key]) as ITuple<string, string>
    const [ facilityNumber, facilityLongName ] = tupleMap(converters, strings);

    return { facilityLongName, facilityNumber }
}
export function parseInfo<T, U>(input: T, name: string, func: (x: T, y: keyof T) => U) {
    return { [name]: func(input, name as keyof T) }
}
export function xformDetails(details: IAuctionDetails, cityName: string) {
    const parsed = [ parseInfo(details, 'contents', parseContents),
                     parseInfo(details, 'customerName', parseCustomerName),
                     parseInfo(details, 'propertyName', parsePropertyName),                     
                     { auctionDate: {
                         iso: Date.parse(details.auctionDate),
                         date: new Date(Date.parse(details.auctionDate)).toDateString(),
                         time: new Date(Date.parse(details.auctionDate)).toTimeString()
                     }},
                     { propertyCity: cityName } ];
    return parsed.reduce(objMerge, details) as { [n: string]: any }
}