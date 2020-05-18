export function set<V>(value: V) {
    return function (name: string) {
        return function (obj: {
            [name: string]: V;
        }) {
            obj[name] = value;
            return obj;
        };
    };
}
