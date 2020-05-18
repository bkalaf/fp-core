export function flip<T, U, V>(f: ((x: T) => (y: U) => V) | ((x: T) => (y: U) => V)): 
    (x: U) => (y: T) => V {
    return function(x: U) {
        return function(y: T) {
            return (f(y)(x))
        }
    }
}

export function flipTup<T, U, V>(f: (x: T, y: U) => V): (x: U, y: T) => V{
    return function(x: U, y: T) {
        return f(y, x);
    }
}