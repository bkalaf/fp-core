import * as fs from 'fs-extra';
import * as path from 'path';

import { curry } from '../fp/curry';
import { deleteFile } from './deleteFile';
import { fsItemExists } from './fsItemExists';
import { makeFolder } from './makeFolder';

export async function _writeDataToFile(data: Object, fn: string) {
	const dir = path.dirname(fn);
	console.log(`dir: ${dir}`)
	await makeFolder(dir);
	const doesExist = await fsItemExists(fn);
	console.log(`doesExist: ${fn} / ${doesExist}`)
	if (doesExist) {
		await deleteFile(fn);
	}
	return new Promise<void>((res, rej) => {
		fs.writeFile(fn, JSON.stringify(data), (err: NodeJS.ErrnoException) => {
			if (err) {
				rej(err);
			}
			res();
		});
	});
}

export const writeDataToFile = curry(_writeDataToFile);