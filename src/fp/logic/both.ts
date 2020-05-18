export function _both<T>(p1: IPredicate<T>, p2: IPredicate<T>): IPredicate<T> {
    return (x: T) => p1(x) ? p2(x) : false;
}
export function both<T>(p1: IPredicate<T>) {
    return function (p2: IPredicate<T>) {
        return _both(p1, p2);
    };
}
