import { prepend } from './../text/append';

export function getElement(prefix: (s: string) => string) {
	return function(b: WebdriverIO.BrowserObject) {
		return function(name: string) {
            return b.$(prefix(name))
        };
	};
}

export const getElementByID = getElement(prepend("#"))
export const getElementByClass = getElement(prepend("."))