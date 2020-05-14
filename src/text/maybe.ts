import { eq } from "./eq";

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
    }
}
export const isNothing = isCase<INothing>('@maybe#nothing');
export const isJust = isCase<IJust<any>>('@maybe#just');
export const Just = <T>(x: T): Maybe<T> => ({ kind: '@maybe#just', value: x })
export const Nothing = (x?: any): Maybe<any> => ({kind: '@maybe#nothing'})