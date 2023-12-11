import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const galaxies = input.map((line) => line.split(''));

const emptyRows: Array<number> = [];
for (let i = 0; i < galaxies.length; i++) {
	if (galaxies[i]!.every((c) => c === '.')) {
		emptyRows.push(i);
	}
}
const emptyCols: Array<number> = [];
for (let j = 0; j < galaxies[0]!.length; j++) {
	let isEmpty = true;
	for (let i = 0; i < galaxies.length; i++) {
		if (galaxies[i]![j]! === '#') {
			isEmpty = false;
		}
	}
	if (isEmpty) {
		emptyCols.push(j);
	}
}

type Coord = [number, number];
const galaxyCoords: Array<Coord> = [];

for (let i = 0; i < galaxies.length; i++) {
	for (let j = 0; j < galaxies[0]!.length; j++) {
		if (galaxies[i]![j]! === '#') {
			galaxyCoords.push([i, j]);
		}
	}
}

const EMPTY_COUNT = 10 ** 6;
let sum = 0;
for (let i = 0; i < galaxyCoords.length - 1; i++) {
	const sourceCoord = galaxyCoords[i]!;
	for (let j = i + 1; j < galaxyCoords.length; j++) {
		const targetCoord = galaxyCoords[j]!;

		for (let k = Math.min(sourceCoord[0], targetCoord[0]); k < Math.max(sourceCoord[0], targetCoord[0]); k++) {
			sum += emptyRows.includes(k) ? EMPTY_COUNT : 1;
		}
		for (let k = Math.min(sourceCoord[1], targetCoord[1]); k < Math.max(sourceCoord[1], targetCoord[1]); k++) {
			sum += emptyCols.includes(k) ? EMPTY_COUNT : 1;
		}
	}
}

console.log(sum);
