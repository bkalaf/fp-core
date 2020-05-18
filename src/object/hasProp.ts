const { hasOwnProperty } = Object;

export function hasProp(name: string) {
    return function (obj: Object) {
        return hasOwnProperty.call(obj, name);
    };
}
