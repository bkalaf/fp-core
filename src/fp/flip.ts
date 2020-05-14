export function flip<T, U, V>(f: Func2<V, T, U>): Func2<V, U, T> {
    return function(x: U) {
        return function(y: T) {
            return (f(y)(x))
        }
    }
}

export function flipTup<T, U, V>(f: TupledFunc2<V, T, U>): TupledFunc2<V, U, T> {
    return function(x: U, y: T) {
        return f(y, x);
    }
}