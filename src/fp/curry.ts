export function curry<T, U, V>(f: (x: T, y: U) => V): (x: T) => (y: U) =>V {
    return function (x: T) {
        return function (y: U) {
            return f(x, y);
        };
    };
}

export function curry3<T, U, V, W>(f: (x: T, y: U, v: V) => W): (x: T) => (y: U) => (z: V) => W {
    return function(x: T) {
        return function (y: U) {
            return function (z: V) {
                return f(x, y, z);
            }
        }
    }
}