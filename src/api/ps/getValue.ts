export function getValue<T>(obj: KeyedObject<T>) {
    return function (name: string) {
        return obj[name];
    };
}
