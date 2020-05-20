import { not } from '../fp/logic/not';

export function complP<T>(func: (x: T) => Promise<boolean>) {
	return async function (x: T) {
		const result = await func(x);
		return not(result);
	};
}
