import { curry } from 'src/fp/curry';
import { promises as fs } from 'fs-extra';

export async function _writeData(data: Object, fn: string) {
	return fs.appendFile(fn, JSON.stringify(data));
}

export const writeData = curry(_writeData);