import * as fs from 'fs-extra';

import { isNullOrUndefined, isObject, isPOJO } from './../check/isTypeOf';

import { IAuctionDetails } from './../types/IAuctionDetails';
import { IAuctionInfo } from '../api/ps/IAuctionInfo';
import { PromiseOp } from './../datastruct/promise';
import { arrayConcat } from '../collections/array/arrayConcat';
import { composeL } from '../fp/compose';
import { curry } from '../fp/curry';
import { distinct } from '../collections/array/distinct';
import { isEmpty } from '../text/isEmpty';
import { objMerge } from '../auto/objMerge';

export function readFile(fn: string) {
    return fs.readFile(fn);
}
export function readBuffer(b: Buffer) {
    return b.toString();
}
export function readJSON<T>(s: string) {
    return JSON.parse(s) as T;
}
export function remapKey(obj: { [n: string]: any }, mapper: (s: string) => string) {
    return Object.keys(obj).map(k => {
        return ({ [mapper(k)]: obj[k] })
    }).reduce(objMerge, {});
}
export function flattenObj(obj: { [n: string]: any }) {
    return Object.keys(obj).map(k => {
        const value = obj[k];
        if (isPOJO(value)) {
            return remapKey(value, (s: string) => `${k}::${s}`);
        } 
        return { [k]: value }
    }).reduce(objMerge, {});
}
export function pullFacility(info: IAuctionInfo) {
    return info['propertyName'];
}
export function flattenInfo(info: IAuctionDetails) {
    return flattenObj(info);
}
export function _fmap<T, U>(f: (x: T) => U, x: T[]) {
    return x.map(f);
}
const echo = <T>(x: T) => {
    console.log(`echo: ${x}`);
    return x;
}
const fmap = curry(_fmap);
const p = composeL(PromiseOp.fmap(readBuffer), readFile)
const p2 = composeL(PromiseOp.fmap(x => readJSON<{ [s: string]: IAuctionDetails[]}>(x)), p)
const f1 = fmap(flattenInfo)
const f2 = (x: { [s: string]: IAuctionDetails[]}) => Object.values(x).reduce(arrayConcat);
const p3 = composeL(PromiseOp.fmap(f1), composeL(PromiseOp.fmap(f2), p2));

function _pickProps(keys: string[], obj: { [n:string]: any }) {
    return Object.keys(obj).filter(k => keys.includes(k)).map(k => ({ [k]: obj[k] })).reduce(objMerge, {});
}
const pickProps = curry(_pickProps);
function _uniqProps(keys: string[], obj: { [n: string]: any }[]) {
    return distinct(obj.map(pickProps(keys)));
}
function arrayEq(arr1: any[], arr2: any[]) {
    const l1 = arr1.length;
    const l2 = arr2.length;
    if (l1 === l2) {
        return arr1.every(x => arr2.includes(x))
    }
    return false;
}
function objEq(obj1: { [k: string]: any }, obj2: { [k: string]: any }) {
    const k1 = Object.keys(obj1)
    const k2 = Object.keys(obj2)
    if (arrayEq(k1, k2)) {
        return k1.every(k => obj2[k] === obj1[k])
    }
    return false;
}
function includes<T>(arr: T[], item: T) {
    function inner(remain: T[]): boolean {
        if (isEmpty(remain)) {
            return false;
        }
        const [h, ...t] = remain;
        const equals = isNullOrUndefined(h) ? false :
                        isObject(h) ? objEq(item, h) : item === h;
        return equals ? true : inner(t);
    }
    return inner(arr);
}
function uniq<T>(arr: T[]) {
    function inner(acc: T[], remain: T[]): T[] {
        if (isEmpty(remain)) {
            return acc;
        }
        const [h,...t] = remain;
        const next = includes(acc, h) ? acc : [ h, ...acc ];
        return inner(next, t);
    }
    return inner([], arr);
}
const uniqProp = curry(_uniqProps);
const facility = ['propertyName::facilityNumber', 'propertyName::facilityLongName', 'propertyCity'];
const result2 = uniqProp(['propertyName::facilityNumber', 'propertyName::facilityLongName', 'propertyCity']);

readFile(`C:/Users/bobby/repos/fp/fp-core/data/1589945305763.json`)
    .then(readBuffer)
    .then(x => readJSON<{ [s: string]: IAuctionDetails[] }>(x))
    .then(x => Object.values(x).reduce(arrayConcat, []))
    .then(fmap(flattenInfo))
    .then(fmap(pickProps(facility)))
    .then(uniq)
    .then(console.log);
// p3(`C:/Users/bobby/repos/fp/fp-core/data/1589945305763.json`).then(fmap(pickProps(facility))).then(distinct).then(console.log)
//then(result2).then(console.log);
