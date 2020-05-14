export function replace(toRepl: string) {
    return function (replacement: string) {
        return function (baseStr: string) {
            return baseStr.replace(toRepl, replacement);
        };
    };
}
