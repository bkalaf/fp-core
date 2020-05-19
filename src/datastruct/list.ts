import { isUndefined } from './../text/substring';
import { curry, curry3 } from '../fp/curry';
import { isEmpty as arrayEmpty } from './../text/isEmpty';
import { cons } from './cons';
import { identity } from '../fp/identity';

export interface ICons<T> {
    kind: '@list#cons';
    head: T;
    tail: List<T>;
}
export interface IEmpty {
    kind: '@list#empty';
}
export type List<T> = ICons<T> | IEmpty;

export function toEmpty(): List<any> {
    return ({kind: '@list#empty' })
}
export function toCons<T>(head: T, tail?: List<T>): List<T> {
    const t = isUndefined(tail) ? toEmpty() : tail;
    return ({ kind: '@list#cons', head, tail: t })
}
export const isCons = <T>(x: List<T>): x is ICons<T> => x.kind === '@list#cons';
export const isEmpty = (x: List<any>): x is IEmpty => x.kind === '@list#empty';
export function of<T>(x: T) {
    return toCons(x);
}
export function concatList<T>(l1: List<T>, l2: List<T>): List<T> {
    if (isEmpty(l1)) return l2;
    const { head, tail } = l1;
    return toCons(head, concatList(tail, l2))
}
export function _foldl<T, TState>(folder: (x: TState) => (y: T) => TState, init: TState, lst: List<T>): TState {
    if (isEmpty(lst)) {
        return init;
    }
    const { head, tail } = lst;
    return _foldl(folder, folder(init)(head), tail);
}
export const foldl = curry3(_foldl);
export function join<T>(x: List<List<T>>): List<T> {
    if (isEmpty(x)) return toEmpty();
    return concatList(x.head, join(x.tail));
}
export function toArray<T>(lst: List<T>): T[] {
    return isEmpty(lst) ? [] : [ lst.head, ...toArray(lst.tail) ]
}
export function ofArray<T>(lst: T[]): List<T> {
    if (lst.length === 0) return toEmpty();
    const [h, ...t] = lst;
    return toCons(lst[0], ofArray(t));
}
export function _chain<T, U>(f: (x: T) => List<U>, x: List<T>): List<U> {
    if (isEmpty(x)) {
        return toEmpty();
    }
    return toArray(x).map(f).reduce((pv, cv) => concatList(pv, cv))
}
export const chain = curry(_chain);
export function _ap<T, U>(f: List<(x: T) => U>, x: List<T>) {
    return _chain((fprime: (x: T) => U) => 
           _chain((xprime: T) => of(fprime(xprime)), x), f)
}
export function _fmap<T, U>(f: (x: T) => U, x: List<T>) {
    return _ap(of(f), x);
}
export const fmap = curry(_fmap);
export const ap = curry(_ap);
export function _lift2a<T, U, V>(f: (x: T) => (y: U) => V, x: List<T>) {
    return curry(_ap)(_ap(of(f), x));
}
export const lift2a = curry(_lift2a);
export function _traverseArray<T, U>(f: (x: T) => U, lst: List<T>[]): List<U[]> {
    if (arrayEmpty(lst)) {
        return of([]);
    }
    const [h, ...t] = lst;
    const first = _fmap(f, h)
return lift2a(cons)(first)(traverseArray(f)(t))
}
export const traverseArray = curry(_traverseArray);
export const sequence = traverseArray(identity);

export interface ListOps {
    of: typeof of;
    fmap: typeof fmap;
    chain: typeof chain;
    ap: typeof ap;
    lift2a: typeof lift2a;
    traverseArray: typeof traverseArray;
    sequence: typeof sequence;
    join: typeof join;
    foldl: typeof foldl;
    toArray: typeof toArray;
    ofArray: typeof ofArray;
}

export const Op = {
    of,
    fmap,
    chain,
    ap,
    lift2a,
    traverseArray,
    sequence,
    join,
    foldl,
    toArray,
    ofArray
}