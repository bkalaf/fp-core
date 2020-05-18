import { curry, curry3 } from 'src/fp/curry';
import { isEmpty as arrayEmpty } from '../text/isEmpty';
import { cons } from './cons';
import { identity } from 'src/fp/identity';
import { Just, Nothing, Maybe } from './maybe';

export interface ILeft<T> {
    kind: '@either#left',
    value: T;
}
export interface IRight<T> {
    kind: '@either#right',
    value: T;
}

export type Either<L, R> = ILeft<L> | IRight<R>;

export function toRight<T>(x: T): Either<any, T> {
    return ({ kind: '@either#right', value: x })
}
export function toLeft<T>(x: T): Either<T, any> {
    return ({ kind: '@either#right', value: x })
}
export const isLeft = <L, R>(x: Either<L, R>): x is ILeft<L> => x.kind === '@either#left';
export const isRight = <L, R>(x: Either<L, R>): x is IRight<R> => x.kind === '@either#right';

export function _chain<R, S, L>(f: (x: R) => Either<L, S>, x: Either<L, R>): Either<L, S> {
    return isLeft(x) ? toLeft(x.value) : f(x.value);
}
export const chain = curry(_chain);

export function of<L, R>(x: R): Either<L, R> {
    return toRight(x);
}
export function _ap<R, S, L>(f: Either<L, (x: R) => S>, x: Either<L, R>): Either<L, S> {
    return _chain((fprime: (x: R) => S) => 
           _chain((xprime: R) => of(fprime(xprime)), x), f);
}
export const ap = curry(_ap);

export function _fmap<R, S, L>(f: (x: R) => S, x: Either<L, R>): Either<L, S> {
    return _ap(of(f), x);
}
export const fmap = _fmap;

export function _lift2a<L, T, U, V>(f: (x: T) => (y: U) => V, x: Either<L, T>, y: Either<L, U>): Either<L, V> {
    return _ap(_ap(of(f), x), y)
}
export const lift2a = curry3(_lift2a);

export function _traverseArray<L, R, S>(f: (x: R) => S, lst: Either<L, R>[]): Either<L, S[]> {
    if (arrayEmpty(lst)) return of([]);
    const [h, ...tail] = lst;
    const first: Either<L, S> = _fmap(f, h);
    const cLifted: (x: Either<L, S>) => (y: Either<L, S[]>) => Either<L, S[]> = lift2a(cons);
    return cLifted(first)(_traverseArray(f, tail))
}
export const traverseArray = curry(_traverseArray);
export const sequence = traverseArray(identity);

export function toMaybe<L, R>(x: Either<L, R>): Maybe<R> {
    return isRight(x) ? Just(x.value) : Nothing();
}
export interface EitherOps {
    of: typeof of;
    fmap: typeof fmap;
    chain: typeof chain;
    ap: typeof ap;
    lift2a: typeof lift2a;
    traverseArray: typeof traverseArray;
    sequence: typeof sequence;
    toMaybe: typeof toMaybe;
}
export const Op: EitherOps = {
    of,
    fmap, 
    chain,
    ap,
    lift2a,
    traverseArray,
    sequence,
    toMaybe
}