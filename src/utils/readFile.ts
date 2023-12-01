import fs from 'fs';

export default function (path: string) {
	return fs.readFileSync(path).toString().trim();
}
