import { assoc } from "../auto/assoc";
import { get } from "../object/get";
import { isTypeOf } from "../check/isTypeOf";

export function isInstanceOf(T: Function) {
    return function(o?: any) {
        return o instanceof T
    }
}

export function repeat(txt: string) {
    return function(qty: number) {
        return txt.repeat(qty);
    }
}
export function padZero(padLength: number) {
    return function (s: string) {
        const len = s.length
        const padded = (padLength - len) < 0 ? 0 : padLength - len;
        const txt = '0'.repeat(padded);
        return `${txt}${s}`;
    };
}
