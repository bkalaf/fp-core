export function defaultArg<T>(defVal: T) {
    return function (value: T) {
        return value ? value : defVal;
    };
}
