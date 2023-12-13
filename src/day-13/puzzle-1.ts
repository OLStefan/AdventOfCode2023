import { isEmpty, isNil } from 'lodash';
import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const splits = input.flatMap((line, index) => (isEmpty(line) ? index : []));

let prev = 0;
const grids: Array<Array<string>> = [];
for (let i = 0; i < splits.length; i++) {
	const nextSplit = splits[i]!;
	grids.push(input.slice(prev, nextSplit));
	prev = nextSplit + 1;
}
grids.push(input.slice(prev));

const splitCols: Array<number> = [];
const splitRows: Array<number> = [];

grids.forEach((grid) => {
	const colMirror = checkColMirror(grid);
	if (!isNil(colMirror)) {
		splitCols.push(colMirror);
		return;
	}

	const rowMirror = checkRowMirror(grid);
	if (!isNil(rowMirror)) {
		splitRows.push(rowMirror);
	}
});

function checkColMirror(grid: Array<string>): number | null {
	const splitGrid = grid.map((l) => l.split(''));
	for (let col = 1; col < splitGrid[0]!.length; col++) {
		let mirror = true;
		for (let i = 0; i < col; i++) {
			const aCol = col - (i + 1);
			if (aCol < 0) {
				break;
			}
			const bCol = col + i;
			if (bCol >= splitGrid[0]!.length) {
				break;
			}

			for (let row = 0; row < grid.length; row++) {
				if (splitGrid[row]![aCol]! !== splitGrid[row]![bCol]!) {
					mirror = false;
					break;
				}
			}
		}
		if (mirror) {
			return col;
		}
	}

	return null;
}
function checkRowMirror(grid: Array<string>): number | null {
	for (let row = 1; row < grid.length; row++) {
		let mirror = true;
		for (let i = 0; i < row; i++) {
			const aRow = row - (i + 1);
			if (aRow < 0) {
				break;
			}
			const bRow = row + i;
			if (bRow >= grid.length) {
				break;
			}
			if (grid[aRow]! !== grid[bRow]!) {
				mirror = false;
				break;
			}
		}
		if (mirror) {
			return row;
		}
	}

	return null;
}

const sum = splitCols.reduce((s, curr) => s + curr, 0) + splitRows.reduce((s, curr) => s + 100 * curr, 0);
console.log(sum);
