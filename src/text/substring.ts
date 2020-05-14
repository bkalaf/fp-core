import { eq } from "./eq";

export function isType<T>(s: string) {
    return function(x?: any): x is undefined {
        return typeof x === s;
    }
}
export const isUndefined = isType<undefined>('undefined');

export function substring(start: number) {
    return function (length: number | undefined) {
        return function (str: string) {
            const total = str.length - (start);
            const len = isUndefined(length) || eq(0)(length) ? total : length;
            if (total < len)
                throw Error('bad length passed to substring');
            return str.substr(start, len);
        };
    };
}
