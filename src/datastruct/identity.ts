import { curry } from "../fp/curry";
import { isEmpty } from "../text/isEmpty";
import { cons } from "./cons";
import { identity as id } from './../fp/identity';
const identity = '@identity'
type Identity<T> = {
    kind: typeof identity;
    value: T;
}

export function toIdentity<T>(x: T): Identity<T> {
    return ({ 
        kind: identity,
        value: x 
    })
}

export function _chain<T, U>(f: (x: T) => Identity<U>, x: Identity<T>) {
    return f(x.value);
}
export function of<T>(x: T): Identity<T> {
    return toIdentity(x);
}
export function _ap<T, U>(fx: Identity<(x: T) => U>, x: Identity<T>) {
    return _chain((fprime: (x: T) => U) => 
           _chain((xprime: T) => of(fprime(xprime)), x), fx)
}
export function _fmap<T, U>(f: (x: T) => U) {
    return curry(_ap)(of(f));
}
export const fmap = _fmap;
export function lift2a<T, U, V>(f: (x: T) => (y: U) => V, x: Identity<T>) {
    return curry(_ap)(curry(_ap)(of(f))(x))
}
export function traverseArray<T, U>(f: (x: T) => U, lst: Identity<T>[]): Identity<U[]> {
    if (isEmpty(lst)) return of([]);
    const [h, ...t] = lst;
    return curry(lift2a)(cons)(fmap(f)(h))(traverseArray(f, t))
}
export const sequence = curry(traverseArray)(id);