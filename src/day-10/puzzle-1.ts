import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

type Pipe = '.' | '|' | '-' | 'L' | 'J' | '7' | 'F' | 'S';
type Coord = [number, number];
const DIRECTION = {
	N: 'N',
	E: 'E',
	S: 'S',
	W: 'W',
} as const;
type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];

const grid = input.map((line) => line.split('') as Array<Pipe>);

let loop: Array<Coord> | null = null;
let currDirIndex = 0;
do {
	loop = findLoop(Object.values(DIRECTION)[currDirIndex]!);
	currDirIndex++;
} while (!loop);
console.log(loop.length / 2);

function findStart(): Coord {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i]!.length; j++) {
			if (grid[i]![j]! === 'S') {
				return [i, j];
			}
		}
	}

	return [-1, -1];
}

function findLoop(dir: Direction) {
	let currCoord: Coord | null = findStart();
	let currDir: Direction | null = dir;

	const visited: Array<Coord> = [];

	do {
		visited.push(currCoord!);
		currDir = getNextDirection(currCoord, invertDirection(currDir));
		currCoord = getNextCoord(currCoord, currDir);
	} while (currCoord && getPipeAtCoord(currCoord) !== 'S');

	return currCoord ? visited : null;
}

function invertDirection(dir: Direction | null): Direction | null {
	switch (dir) {
		case 'N':
			return DIRECTION.S;
		case 'E':
			return DIRECTION.W;
		case 'S':
			return DIRECTION.N;
		case 'W':
			return DIRECTION.E;
	}
	return null;
}

function getNextCoord(coord: Coord | null, dir: Direction | null): Coord | null {
	if (!dir || !coord) {
		return null;
	}

	switch (dir) {
		case DIRECTION.N:
			return [coord[0] - 1, coord[1]];
		case DIRECTION.E:
			return [coord[0], coord[1] + 1];
		case DIRECTION.S:
			return [coord[0] + 1, coord[1]];
		case DIRECTION.W:
			return [coord[0], coord[1] - 1];
	}
}

function getPipeAtCoord(coord: Coord): Pipe {
	return grid[coord[0]]![coord[1]]!;
}

function getNextDirection(coord: Coord | null, enterDir: Direction | null): Direction | null {
	if (!enterDir || !coord) {
		return null;
	}

	const pipe = getPipeAtCoord(coord);
	switch (pipe) {
		case 'S':
			return enterDir;
		case '.':
			return null;
		case '|':
			switch (enterDir) {
				case DIRECTION.N:
					return DIRECTION.S;
				case DIRECTION.E:
					return null;
				case DIRECTION.S:
					return DIRECTION.N;
				case DIRECTION.W:
					return null;
			}
		case '-':
			switch (enterDir) {
				case DIRECTION.N:
					return null;
				case DIRECTION.E:
					return DIRECTION.W;
				case DIRECTION.S:
					return null;
				case DIRECTION.W:
					return DIRECTION.E;
			}
		case 'L':
			switch (enterDir) {
				case DIRECTION.N:
					return DIRECTION.E;
				case DIRECTION.E:
					return DIRECTION.N;
				case DIRECTION.S:
					return null;
				case DIRECTION.W:
					return null;
			}
		case 'J':
			switch (enterDir) {
				case DIRECTION.N:
					return DIRECTION.W;
				case DIRECTION.E:
					return null;
				case DIRECTION.S:
					return null;
				case DIRECTION.W:
					return DIRECTION.N;
			}
		case '7':
			switch (enterDir) {
				case DIRECTION.N:
					return null;
				case DIRECTION.E:
					return null;
				case DIRECTION.S:
					return DIRECTION.W;
				case DIRECTION.W:
					return DIRECTION.S;
			}
		case 'F':
			switch (enterDir) {
				case DIRECTION.N:
					return null;
				case DIRECTION.E:
					return DIRECTION.S;
				case DIRECTION.S:
					return DIRECTION.E;
				case DIRECTION.W:
					return null;
			}
	}
}
