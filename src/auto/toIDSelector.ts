import { prepend } from './../text/append';

export function toIDSelector(str: string) {
	return prepend('#')(str);
}

