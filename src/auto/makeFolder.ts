import * as fs from 'fs-extra';

import { fsItemExists } from "./fsItemExists";

export async function makeFolder(dir: string) {
	if (await fsItemExists(dir)) {
		console.log(`directory: ${dir} already exists.`);
		return;
	}
	console.log(`creating: ${dir}`)
	return new Promise<void>((res, rej) => fs.mkdir(dir, (error?: NodeJS.ErrnoException) => {
		if (error) {
			rej(error);
		}
		res();
	}));
}
