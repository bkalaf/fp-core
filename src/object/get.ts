import { Just, isJust } from '../datastruct/maybe';
import { Maybe, Nothing } from '../datastruct/maybe';

import { getDescriptor } from './getDescriptor';

export function get(name: string) {
    return function <U>(obj: Object): Maybe<U> {
        const maybe = getDescriptor(obj, name);
        return isJust(maybe) ? Just(maybe.value.value) : Nothing();
    };
}
