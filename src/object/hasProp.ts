import { curry } from "../fp/curry";

const { hasOwnProperty } = Object;

export function _hasProp(name: string, obj: Object): boolean {
    return hasOwnProperty.call(obj, name);
}

export const hasProp = curry(_hasProp);