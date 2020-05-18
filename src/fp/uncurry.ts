export function uncurry<T, U, V>(f: (x: T) => (y: U) => V): (x: T, y: U) => V {
    return function (x: T, y: U) {
        return f(x)(y);
    };
}
