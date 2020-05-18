import { cons } from './cons';
import { eq } from '../fp/eq';
import { identity } from '../fp/identity';
import { isEmpty } from '../text/isEmpty';

export interface IJust<T> {
	kind: '@maybe#just';
	value: T;
}
export interface INothing {
	kind: '@maybe#nothing';
}
export type Maybe<T> = IJust<T> | INothing;
export function isCase<T>(str: string) {
	return function(x: any): x is T {
		return eq(str)(x.kind);
	};
}
export const isNothing = isCase<INothing>('@maybe#nothing');
export const isJust = isCase<IJust<any>>('@maybe#just');
export const Just = <T>(x: T): Maybe<T> => ({ kind: '@maybe#just', value: x });
export const Nothing = <T>(x?: any): Maybe<T> => ({ kind: '@maybe#nothing' });

export const of = Just;
export function chain<T, U>(f: (x: T) => Maybe<U>) {
	return function(x: Maybe<T>) {
		return isJust(x) ? f(x.value) : Nothing<U>();
	};
}

export function ap<T, U>(f: Maybe<(x: T) => U>) {
	return function(x: Maybe<T>) {
		return chain((fprime: (x: T) => U) => chain((xprime: T) => Just(fprime(xprime)))(x))(f);
	};
}

export const fmap = function<T, U>(f: (x: T) => U) {
	return ap(of(f));
};
export function lift2a<T, U, V>(f: (x: T) => (y: U) => V) {
	return function(x: Maybe<T>) {
		return ap(ap(of(f))(x));
	};
}
export function traverseArray<T, U>(f: (x: T) => U) {
	return function(lst: Maybe<T>[]): Maybe<U[]> {
		const c = lift2a(cons);
		if (isEmpty(lst)) {
			return of([]);
		}
		const [ h, ...t ] = lst;
		return c(fmap(f)(h))(traverseArray(f)(t));
	};
}
export const sequence = traverseArray(identity);

export type MaybeOp = {
	fmap: typeof fmap,
	of: typeof of,
	ap: typeof ap,
	chain: typeof chain,
	traverseArray: typeof traverseArray,
	sequence: typeof sequence,
	lift2a: typeof lift2a
}
export const Op: MaybeOp = {
	fmap,
	of,
	ap,
	chain,
	traverseArray,
	sequence,
	lift2a
}