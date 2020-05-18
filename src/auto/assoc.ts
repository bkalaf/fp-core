import { get } from '../object/get';
import { isEmpty } from "../text/isEmpty";
import { splitAt } from "../text/append";

function _assoc<T>(name: string, value: T, obj: { [name: string]: T }) {
    return Object.assign({}, obj, { [name]: value });    
}

export function assoc(name: string) {
    return function<T>(value: T) {
        return function(obj: KeyedObject<T>) {
            return _assoc(name, value, obj);
        }
    }
}
export function splitPathDoubleColon(name: string) {
    return splitAt('::')(name);
}
export function splitPathSolidus(name: string) {
    return splitAt('/')(name);
}


const handleInput = (input: string | string[]) => Array.isArray(input) ? input : splitPathSolidus(input)
export function getPath(name: string | string[]) {
    return function<T>(obj: KeyedObject<T> | Object): T {
        const splitted = handleInput(name)
        if (isEmpty(splitted)) {
            const result = obj as any as T
            return result;
        }
        const [h, ...t] = splitted;
        return getPath(t)(get(h)(obj))
    }
}

