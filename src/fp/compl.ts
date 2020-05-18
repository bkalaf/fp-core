export function compl<T>(predicate: IPredicate<T>): IPredicate<T> {
    return function (x: T) {
        return !predicate(x);
    };
}
