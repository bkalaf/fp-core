import { BrowserObject, remote } from 'webdriverio';

import { ITuple } from './ITuple';
import { PromiseOp } from './../datastruct/promise';
import { composeL } from './../fp/compose';
import { curry } from './../fp/curry';
import { flip } from './../fp/flip';
import { pair } from 'src/tuple/pair';
import { prepend } from './../text/append';

const P = PromiseOp;
const forClass = prepend('.');
const forId = prepend('#');

export const toSelector = (b: WebdriverIO.BrowserObject) => (selector: string) => b.$(selector);
// BrowserObject -> string -> Promise<Element>
export const toMultiSelector = (b: WebdriverIO.BrowserObject) => (selector: string) => b.$$(selector);
// string -> BrowserObject -> Promise<Element>
const classSelector = composeL(flip(toSelector), forClass);
// string -> BrowserObject -> Promise<Element>
const idSelector = composeL(flip(toSelector), forId);
// Element -> Promise<void>
const click = (element: WebdriverIO.Element) => element.click();

function atIndex(n: number) {
	return function<T>(arr: T[]) {
		return arr[n];
	};
}
const getText = (element: WebdriverIO.Element) => element.getText();
export const getTextFromID = (b: BrowserObject) => composeL(P.chain(getText), toSelector(b));
const getIndex = (ix: number) => P.fmap(atIndex(ix));
export const getTextFromMulti = (ix: number) => (b: BrowserObject) =>
	composeL(P.chain(getText), composeL(P.fmap(atIndex(ix)), toMultiSelector(b)));
export async function join<T>(x: Promise<Promise<T>>) {
	return x;
}

let b: WebdriverIO.BrowserObject = {} as any;
// string -> Promise<Element>

const clickButton = (b: WebdriverIO.BrowserObject) => (n: string) =>
	P.chain(click)(idSelector(n)(b));

export function unpair<T, U, V>(f: (x: T) => (y: U) => V): (X: ITuple<T, U>) => V {
	return function(tuple: ITuple<T, U>) {
		return f(tuple[0])(tuple[1]);
	};
}
const pickDropDown = (element: WebdriverIO.Element) => (value: string) => element.selectByAttribute('value', value);

export function selectDropDownValue(name: string) {
	return function(browser: WebdriverIO.BrowserObject) {
		const res = flip(pickDropDown);
		const res2 = (value: string) => composeL(P.chain(res(value)), idSelector(name));
		const postBack = browser.execute(doPostBack(name), 0);
		const chainPromise = async function(p: Promise<any>, p2: Promise<any>) {
			await p;
			await p2;
			await browser.pause(1000);
		};
		const f = flip(composeL(curry(chainPromise), flip(res2)(browser)));
		return f(postBack);
	};
}

export function doPostBack(name: string) {
	// onchange="javascript:setTimeout('__doPostBack(\'ddlState\',\'\')', 0)"
	// (x) => setTimeout(`__doPostBack(\'${name}\',\'\')`, x), 0);
	const script = (x: any) => setTimeout(`__doPostBack(\'${name}\',\'\')`, x);
	return script;
}
export function setDropDown(b: WebdriverIO.BrowserObject) {
	const liftedPair = P.lift2a(pair);
	const unpaired = P.chain(unpair(toSelector));
	const comb = (browser: WebdriverIO.BrowserObject) =>
		composeL(composeL(unpaired, liftedPair(P.of(browser))), (s: string) => P.of(s));
	const setDD = (browser: WebdriverIO.BrowserObject) => (name: string) => (value: string) =>
		P.chain(flip(pickDropDown)(value))(comb(browser)(name));
	return setDD(b);
}

export async function wrapInPostBack(
	f: (b: WebdriverIO.BrowserObject) => (name: string) => Promise<void> | ((value: string) => Promise<void>),
	browser: WebdriverIO.BrowserObject,
	name: string,
	value?: string
) {
	const result = f(browser)(name);
	if (typeof result === 'function') {
		await result(value!);
	}
	await f(browser)(name);
}

export const useDropDown = (b: WebdriverIO.BrowserObject, name: string, value: string) =>
	wrapInPostBack(setDropDown, b, name, value);
export const useButton = (b: WebdriverIO.BrowserObject, name: string) => wrapInPostBack(clickButton, b, name);
export const navTo = (b: WebdriverIO.BrowserObject, url: string) => b.url(url);

export type Step = [string, string, Function];

const navHome = [ 'https://publicstorageauctions/', '', navTo ];
const ddlState = [ 'ddlState', 'CA', useDropDown ];
const ddlCity = [ 'ddlCity', 'San Diego', useDropDown ];
const btnSubmit = [ 'btnSubmit', '', useButton ];

export const steps = [ navHome, ddlState, ddlCity, btnSubmit ];
