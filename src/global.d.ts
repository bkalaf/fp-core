declare global {
    export type Func<TRet, T> = (x: T) => TRet;
    export type Func2<TRet, T, U> = (x: T) => (y: U) => TRet;

    export type TupledFunc2<TRet, T, U> = (x: T, y: U) => TRet;
}

export const SELENIUM_BROWSER = 'chrome';
export const FILE_PATHS = {
    GOOGLE_CREDENTIALS = 'credentials.json',
    ACCESS_TOKEN = 'token.json'
}