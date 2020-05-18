export function splitAt(delimiter: string) {
    return function (baseStr: string) {
        return baseStr.split(delimiter);
    };
}
