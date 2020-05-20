import * as fs from 'fs-extra';

import { fsItemExists } from './fsItemExists';

export async function deleteFile(fn: string) {
	return new Promise<void>((res, rej) => {
		fsItemExists(fn).then(exists => exists ? fs.unlink(fn, (err: NodeJS.ErrnoException) => {
			if (err)
				rej(err);
			res();
		}) : res());
	});
}
