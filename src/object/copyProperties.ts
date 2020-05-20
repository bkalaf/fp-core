import {
	isBoolean,
	isFunction,
	isNotNullOrUndefined,
	isNullOrUndefined,
	isNumber,
	isObject,
	isString,
	isSymbol,
	isUndef
} from '../check/isTypeOf';

import { any } from '../fp/logic/any';
import { arrayConcat } from '../collections/array/arrayConcat';
import { distinct } from '../collections/array/distinct';
import { getDescriptor } from './getDescriptor';
import { getProperties } from './getProperties';
import { isArray } from '../check/isArray';

export const isPrimitiveType = any(isSymbol, isString, isNumber, isBoolean);

export function combinePropList(t1: Object, t2: Object) {
	return arrayConcat(getProperties(t1), getProperties(t2));
}
export function _merge(source1: any, source2: any) {
	function inner(name: string, dest: Object) {
        const [descr1, descr2] = [ getDescriptor(source1, name), getDescriptor(source2, name) ]
        const [result1, result2] = [source1[name], source2[name]]
        console.log(`descr1: ${descr1} descr2: ${descr2} result1: ${result1} result2: ${result2}`)
        if (isArray(result1) && isArray(result2)) {
			return [ ...result1, ...result2 ];
		} else if (isFunction(result1) || isFunction(result2)) {
            const basedescr = isUndef(result1) ? descr2 : descr1;
            const d = dest as any;
            return basedescr?.value;
		} else if (isObject(result1) && isObject(result2)) {
			return _merge(result1, result2);
		} else if (isPrimitiveType(result1) && isPrimitiveType(result2)) {
            return [ result1, result2 ];
		} else if (isNullOrUndefined(result1) && isNotNullOrUndefined(result2)) {
			return result2;
		} else if (isNotNullOrUndefined(result1) && isNullOrUndefined(result2)) {
			return result1;
		} else {
			return result1;
		}
	}
	const target: any = {};
	distinct(combinePropList(source1, source2)).forEach((n: string) => {
        console.log(`foreach: ${n}`)
		target[n] = inner(n, target);
	});
	return target;
}

const item1 = { 1: 'one', 2: 'two', 3: [ 1, 2, 3 ], 6: { testing2: 'test' }, toText(){ return 1; }};
const item2 = { 3: [ 4, 5 ], 6: { testing: 'test' } };
console.log(_merge({ 1: 'one', 2: 'two', three: 3, four: {}, 5: [ 'one', 'two' ] }, {}));
console.log(_merge(item1, item2));
console.log(_merge(item1, item2).toText())
