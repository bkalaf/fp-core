import { get } from './get';
import { isEmpty } from "../text/isEmpty";

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


