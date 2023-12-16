import { uniq } from 'lodash';
import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const mirrors: Record<string, (beam: LightBeam) => Array<LightBeam>> = {};
input.forEach((line, i) => {
	line.split('').forEach((c, j) => {
		switch (c) {
			case '/':
				mirrors[`${i}-${j}`] = mirrorLU;
				return;
			case '\\':
				mirrors[`${i}-${j}`] = mirrorRU;
				return;
			case '-':
				mirrors[`${i}-${j}`] = mirrorLR;
				return;
			case '|':
				mirrors[`${i}-${j}`] = mirrorDU;
				return;
		}
	});
});

type Coord = [number, number];
const DIRECTION = { U: 'U', R: 'R', D: 'D', L: 'L' } as const;
type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];
interface LightBeam {
	coord: Coord;
	direction: Direction;
}

let beams: Array<LightBeam> = [{ coord: [0, 0], direction: DIRECTION.R }];
let visited: Record<string, true> = {};

const MAX_ROW = input.length;
const MAX_COL = input[0]!.length;

while (beams.length) {
	beams = beams.flatMap((beam) => {
		visited[`${beam.coord[0]}-${beam.coord[1]}-${beam.direction}`] = true;
		const mirror = mirrors[`${beam.coord[0]}-${beam.coord[1]}`];
		const newCoordBeams = mirror?.(beam) ?? [{ ...beam, coord: getNextCoord(beam) }];
		return newCoordBeams.flatMap((newBeam) => {
			if (newBeam.coord[0] < 0 || newBeam.coord[0] >= MAX_ROW) {
				return [];
			}
			if (newBeam.coord[1] < 0 || newBeam.coord[1] >= MAX_COL) {
				return [];
			}
			if (visited[`${newBeam.coord[0]}-${newBeam.coord[1]}-${newBeam.direction}`]) {
				return [];
			}
			return newBeam;
		});
	});
}
console.log(uniq(Object.keys(visited).map((v) => v.match(/(.+-.+)-.+/)![1])).length);

function getNextCoord(beam: LightBeam): Coord {
	const [row, col] = beam.coord;
	switch (beam.direction) {
		case 'U':
			return [row - 1, col];
		case 'R':
			return [row, col + 1];
		case 'D':
			return [row + 1, col];
		case 'L':
			return [row, col - 1];
	}
}

function mirrorLU(beam: LightBeam): Array<LightBeam> {
	const [row, col] = beam.coord;
	switch (beam.direction) {
		case 'U':
			return [{ coord: [row, col + 1], direction: DIRECTION.R }];
		case 'R':
			return [{ coord: [row - 1, col], direction: DIRECTION.U }];
		case 'D':
			return [{ coord: [row, col - 1], direction: DIRECTION.L }];
		case 'L':
			return [{ coord: [row + 1, col], direction: DIRECTION.D }];
	}
}
function mirrorRU(beam: LightBeam): Array<LightBeam> {
	const [row, col] = beam.coord;
	switch (beam.direction) {
		case 'U':
			return [{ coord: [row, col - 1], direction: DIRECTION.L }];
		case 'R':
			return [{ coord: [row + 1, col], direction: DIRECTION.D }];
		case 'D':
			return [{ coord: [row, col + 1], direction: DIRECTION.R }];
		case 'L':
			return [{ coord: [row - 1, col], direction: DIRECTION.U }];
	}
}
function mirrorDU(beam: LightBeam): Array<LightBeam> {
	const [row, col] = beam.coord;
	switch (beam.direction) {
		case 'U':
			return [{ coord: [row - 1, col], direction: DIRECTION.U }];
		case 'D':
			return [{ coord: [row + 1, col], direction: DIRECTION.D }];
		case 'R':
		case 'L':
			return [
				{ coord: [row - 1, col], direction: DIRECTION.U },
				{ coord: [row + 1, col], direction: DIRECTION.D },
			];
	}
}
function mirrorLR(beam: LightBeam): Array<LightBeam> {
	const [row, col] = beam.coord;
	switch (beam.direction) {
		case 'U':
		case 'D':
			return [
				{ coord: [row, col - 1], direction: DIRECTION.L },
				{ coord: [row, col + 1], direction: DIRECTION.R },
			];
		case 'R':
			return [{ coord: [row, col + 1], direction: DIRECTION.R }];
		case 'L':
			return [{ coord: [row, col - 1], direction: DIRECTION.L }];
	}
}
