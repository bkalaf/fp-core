import { append } from './../text/append';
import { isEmpty } from './../text/isEmpty';
import { identity } from '../fp/identity';
export type Async<T> = Promise<T>

export function chain<T, U>(f: (x: T) => Promise<U>) {
    return function(x: Promise<T>) {
        return x.then(f);
    }
}
export function of<T>(x: T) {
    return Promise.resolve(x);
}
export function ap<T, U, V>(f: Promise<(x: T) => U>) {
    return function(x: Promise<T>) {
        return chain((fprime: (X: T) => U) =>
                 chain((xprime: T) => of(fprime(xprime)))(x))(f)
    }
}
export function fmap<T, U>(f: (x: T) => U) {
    return function(x: Promise<T>) {
        return ap(of(f))(x);
    }
}
export function lift2a<T, U, V>(f: (x: T) => (y: U) => V) {
    return function(x: Promise<T>) {
        return ap(ap(of(f))(x));
    }
}
export function traverse<T, U>(f: (x: T) => U) {
    return function(lst: Promise<T>[]): Promise<U[]> {
        const cons = <T>(h: T) => (t: T[]) => [h, ...t];
        const lifted = lift2a(cons);
        if (isEmpty(lst)) {
            return of([])
        }
        const [head, ...tail] = lst;
        return lifted(fmap(f)(head))(traverse(f)(tail));
    }
}
export const sequence = traverse(identity);
export async function join<T>(promise: Promise<Promise<T>> | Promise<Promise<void>>) {
    return promise;
}
export interface PromiseOps {
    fmap: typeof fmap;
    ap: typeof ap;
    chain: typeof chain;
    of: typeof of;
    lift2a: typeof lift2a;
    traverse: typeof traverse;
    sequence: typeof sequence;
    join: typeof join;
}
export const PromiseOp: PromiseOps = {
    fmap,
    join,
    chain,
    lift2a,
    ap, 
    of,
    sequence,
    traverse
}