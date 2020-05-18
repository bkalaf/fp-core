import { prepend } from './../text/append';
import { processTable } from './table2';
import { remote } from 'webdriverio';

export function doPostBack(name: string) {
	const script = (x: any) => setTimeout(`__doPostBack(\'${name}\',\'\')`, x);
	return script;
}

const button = {
    click: async (b: WebdriverIO.BrowserObject, name: string) => {
        const element = await b.$(prepend('#')(name))
        await element.click();
        await b.execute(doPostBack(name), 0);
    }
}
const dropDown = {
    selectByValue: async (b: WebdriverIO.BrowserObject, name: string, value: string) => {
        const element = await b.$(prepend(name));
        await element.selectByAttribute('value', value);
        await b.execute(doPostBack(name), 0)
    }
}
const navigate = {
    goto: async (b: WebdriverIO.BrowserObject, x: string) => await b.url(x)
}

const table = {
    gather: processTable
    }
export interface Controls {
    button: typeof button;
    dropDown: typeof dropDown;
    navigate: typeof navigate;
    table: typeof table;
}

export const Controls: Controls = {
    button,
    navigate,
    dropDown,
    table
}

async function doit() {
    const b = () => (remote({
        capabilities: {
            browserName: 'chrome'
        }
    }) as any) as Promise<WebdriverIO.BrowserObject>;
    const browser = await b();
    await Controls.navigate.goto(browser, 'https://www.publicstorageauction.com/');
    await Controls.dropDown.selectByValue(browser, 'ddlState', 'CA');
    await Controls.dropDown.selectByValue(browser, 'ddlCity', 'San Diego');
    const out = await Controls.table.gather(browser)
    console.log(JSON.stringify(out))
}

doit();