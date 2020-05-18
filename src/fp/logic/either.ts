export function _either<T>(p1: IPredicate<T>, p2: IPredicate<T>) {
    return (x: T) => p1(x) ? true : p2(x);
}

export function either<T>(p1: IPredicate<T>) {
    return function (p2: IPredicate<T>) {
        return _either(p1, p2)
    };
}
