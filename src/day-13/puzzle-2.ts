import { cloneDeep, isEmpty, isNil } from 'lodash';
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

let sum = 0;
grids.forEach((grid) => {
	const original = checkSmudgedGrid(grid);

	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[0]!.length; col++) {
			const newGrid = smudgeGrid(grid, row, col);
			const mirrored = checkSmudgedGrid(newGrid, original ?? undefined);
			if (!isNil(mirrored) && mirrored !== original) {
				sum += mirrored;
				return;
			}
		}
	}
});
console.log(sum);

function smudgeGrid(grid: Array<string>, row: number, col: number) {
	const clone = cloneDeep(grid);

	const split = clone[row]!.split('');
	const orig = split[col]!;
	split[col] = orig === '.' ? '#' : '.';
	clone[row] = split.join('');
	return clone;
}

function checkSmudgedGrid(grid: Array<string>, originalScore?: number) {
	const col = checkColMirror(grid, originalScore);
	if (!isNil(col)) {
		return col;
	}

	const row = checkRowMirror(grid, originalScore);
	if (!isNil(row)) {
		return row * 100;
	}

	return null;
}

function checkColMirror(grid: Array<string>, originalScore?: number): number | null {
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
		if (mirror && (isNil(originalScore) || originalScore !== col)) {
			return col;
		}
	}

	return null;
}
function checkRowMirror(grid: Array<string>, originalScore?: number): number | null {
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
		if (mirror && (isNil(originalScore) || originalScore / 100 !== row)) {
			return row;
		}
	}

	return null;
}
