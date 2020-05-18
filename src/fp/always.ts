export function always<T>(x?: any) {
    return function (_x?: any) {
        return x;
    };
}
