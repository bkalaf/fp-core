export function isArray<T>(x?: any): x is T[] {
    return Array.isArray(x);
}
