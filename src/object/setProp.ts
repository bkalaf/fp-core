import { curry3 } from "../fp/curry";

export function _setProp<V>(value: V, name: string, obj: KeyedObject<V>) {
    obj[name] = value;
    return obj;
}

export const setProp = curry3(_setProp);