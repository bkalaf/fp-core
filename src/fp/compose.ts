export function composeL<T, U, V>(f: Func<V, U>, g: Func<U, T>): Func<V, T> {
    return function(item: T) {
        return f(g(item));
    }
}

export function composeR<T, U, V>(f: Func<U, T>, g: Func<V, U>): Func<V, T> {
    return function(item: T) {
        return g(f(item));
    }
}

export const $ = composeL;
