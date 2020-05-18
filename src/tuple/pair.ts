function _pair<T, U>(left: T, right: U): ITuple<T, U> {
    return [left, right]
}
export function pair<T, U>(x: T) {
    return function (y: U): ITuple<T, U> {
        return _pair(x, y);
    };
}
