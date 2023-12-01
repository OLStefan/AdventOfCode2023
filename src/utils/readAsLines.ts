import fs from 'fs';
import readFile from './readFile';

export default function (path: string) {
	return readFile(path).split('\n');
}
