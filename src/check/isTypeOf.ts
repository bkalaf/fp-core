import { both } from "../fp/logic/both";
import { compl } from "../fp/compl";
import { composeL } from '../fp/compose';
import { either } from "../fp/logic/either";
import { isInstanceOf } from "../text";

export type TypeOfs = 'undefined' | 'string' | 'number' | 'symbol' | 'function' |'object' | 'bigint' | 'boolean';

export function isTypeOf<T>(label: TypeOfs) {
    return function (o?: any): o is T {
        return typeof o === label;
    };
}
export function getProto(obj: Object) {
    return Object.getPrototypeOf(obj);
}
export const isUndef = isTypeOf<undefined>('undefined');
export const _isNull = (x?: any): x is null => x == null && isNotUndefined(x);
export const hasNullProto = composeL(_isNull, getProto);
export const isObjectInstance = isInstanceOf(Object);
export const isString = isTypeOf<string>('string');
export const isNumber = isTypeOf<number>('number');
export const isSymbol = isTypeOf<symbol>('symbol');
export const _isFunction = isTypeOf<Function>('function');
export const _isObject = isTypeOf<Object>('object');
export const isBigInt = isTypeOf<BigInt>('bigint');
export const isBoolean = isTypeOf<boolean>("boolean")   
export const isNotUndefined = compl(isUndef);
export const isNullOrUndefined = either(_isNull)(isUndef);
export const isNotNullOrUndefined = compl(isNullOrUndefined);
export const isArray = (x?: any): x is Array<any> => Array.isArray(x);
export const isFunction = both(_isFunction)(isInstanceOf(Function))
export const isPOJO = (x?: any): x is object => 
    both(both(_isObject)(either(hasNullProto)(isObjectInstance)))(compl(isArray))(x);
export const neither = <T>(p1: IPredicate<T>) => (p2: IPredicate<T>) => both(compl(p1))(compl(p2));
export const isObject = (x?: any): x is object =>
    both(_isObject)(neither(isFunction)(isArray))(x);