export function composeL<T, U, V>(f: (x: U) => V, g: (x: T) => U): (x: T) => V {
    return function(item: T) {
        return f(g(item));
    }
}

export function composeR<T, U, V>(f: (x: T) => U, g: (x: U) => V):(x: T) => V {
    return function(item: T) {
        return g(f(item));
    }
}

export const $ = composeL;
