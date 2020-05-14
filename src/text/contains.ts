import { eq } from './eq';
import { isEmpty } from './isEmpty';
import { ofCharArray } from './ofCharArray';
import { substring } from './substring';
import { tail } from './tail';
import { toCharArray } from './toCharArray';

export function contains(tocheck: string) {
	return function(baseStr: string): boolean {
		function inner(s1: string, s2: string): boolean {
			if (isEmpty(s1) || isEmpty(s2)) return true;
			const [ h1, ...t1 ] = toCharArray(s1);
			const [ h2, ...t2 ] = toCharArray(s2);
			return eq(h1)(h2) ? inner(ofCharArray(t1), ofCharArray(t2)) : false;
		}
		if (isEmpty(tocheck) || isEmpty(baseStr) || tocheck.length > baseStr.length) return false;
		return inner(tocheck, substring(0)(tocheck.length)(baseStr)) ? true : contains(tocheck)(tail(baseStr));
	};
}
