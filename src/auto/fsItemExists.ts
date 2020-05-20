import * as fs from 'fs-extra';

export function fsItemExists(fn: string) {
	return new Promise((res: (s: boolean) => void, rej) => fs.exists(fn, (exists: boolean) => res(exists)));
}
