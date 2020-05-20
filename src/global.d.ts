declare global {
    export type Func<TRet, T> = (x: T) => TRet;
    export type Func2<TRet, T, U> = (x: T) => (y: U) => TRet;

    export type TupledFunc2<TRet, T, U> = (x: T, y: U) => TRet;
    export type KeyedObject<T> = { [n: string]: T }
    export type IPredicate<T> = (x: T) => boolean;
    export interface ITuple<T, U> extends Array<T|U> {
        [0]: T;
        [1]: U;
        length: 2;
    }
    export type AssociationMap<T, V> = { [P in keyof T]: V } 
    export type NotNull<T> = T extends undefined | null ? never : T;
}

export const SELENIUM_BROWSER = 'chrome';
export const FILE_PATHS = {
    GOOGLE_CREDENTIALS: 'credentials.json',
    ACCESS_TOKEN: 'token.json'
}