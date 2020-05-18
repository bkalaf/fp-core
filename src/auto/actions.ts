import { BrowserObject, remote } from 'webdriverio';
import { processPage, processTable } from './table';

import { composeL } from 'src/fp/compose';
import { flip } from 'src/fp/flip';
import { getElementByID } from './getElement';
import { setDropDown } from './selectors';

export function click(b: BrowserObject) {
	return function(ele: WebdriverIO.Element) {
		return ele.click();
	};
}

export function setDropDownValue(b: BrowserObject) {
	return function(ele: WebdriverIO.Element) {
		return function(value: string) {
			return ele.selectByAttribute('value', value);
		};
	};
}
export function postBack(b: BrowserObject) {
    return function(name: string) {
        const script = (x: any) => {
            setTimeout(`__doPostBack(\'${name}\',\'\')`, x);
        }
	    return b.execute(script, 0);
    }
}

export async function page(b: BrowserObject) {
    async function dd(name: string, value: string) {
        const ele = await getElementByID(b)(name);
        await setDropDownValue(b)(ele)(value);
        await postBack(b)(name);
    }
    async function btn(name: string) {
        const ele = await getElementByID(b)(name);
        await click(b)(ele);
        await postBack(b)(name);
    }
    await b.navigateTo('https://www.publicstorageauctions.com/')
    await dd('ddlState', 'CA');
    await dd('ddlCity', 'San Diego')
    await btn('btnSubmit');

    let result = await processTable(b)
    return result;
}

const b = () => (remote({
	capabilities: {
		browserName: 'chrome'
	}
}) as any) as Promise<WebdriverIO.BrowserObject>;
b().then(page);