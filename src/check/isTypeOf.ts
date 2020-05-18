import { compl } from "../fp/compl";
import { either } from "../fp/logic/either";

export type TypeOfs = 'undefined' | 'string' | 'number' | 'symbol' | 'function' |'object' | 'bigint' | 'boolean';

export function isTypeOf<T>(label: TypeOfs) {
    return function (o?: any): o is T {
        return typeof o === label;
    };
}
export const isUndefined = isTypeOf<undefined>('undefined');
export const isNull = (x?: any): x is null => x == null && isNotUndefined(x);
export const isString = isTypeOf<string>('string');
export const isNumber = isTypeOf<number>('number');
export const isSymbol = isTypeOf<symbol>('symbol');
export const isFunction = isTypeOf<Function>('function');
export const isObject = isTypeOf<Object>('object')
export const isBigInt = isTypeOf<BigInt>('bigint');
export const isBoolean = isTypeOf<boolean>("boolean")   
export const isNotUndefined = compl(isUndefined);
export const isNullOrUndefined = either(isNull)(isUndefined);
export const isNotNullOrUndefined = compl(isNullOrUndefined);
