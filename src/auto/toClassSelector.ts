import { prepend } from './../text/append';

export function toClassSelector(str: string) {
	return prepend('.')(str);
}
