import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const expandedRows = input.flatMap((line) => {
	const splits = line.split('');
	if (splits.every((c) => c === '.')) {
		return [splits, splits];
	}
	return [splits];
});

const emptyCols: Array<number> = [];
for (let j = 0; j < expandedRows[0]!.length; j++) {
	let isEmpty = true;
	for (let i = 0; i < expandedRows.length; i++) {
		if (expandedRows[i]![j]! === '#') {
			isEmpty = false;
		}
	}
	if (isEmpty) {
		emptyCols.push(j);
	}
}

const expanded = expandedRows.map((row) =>
	row.flatMap((c, i) => {
		if (emptyCols.includes(i)) {
			return [c, c];
		}
		return [c];
	}),
);

type Coord = [number, number];
const galaxyCoords: Array<Coord> = [];

for (let i = 0; i < expanded.length; i++) {
	for (let j = 0; j < expanded[0]!.length; j++) {
		if (expanded[i]![j]! === '#') {
			galaxyCoords.push([i, j]);
		}
	}
}

let sum = 0;
for (let i = 0; i < galaxyCoords.length - 1; i++) {
	const sourceCoord = galaxyCoords[i]!;
	for (let j = i + 1; j < galaxyCoords.length; j++) {
		const targetCoord = galaxyCoords[j]!;
		const distance = Math.abs(sourceCoord[0] - targetCoord[0]) + Math.abs(sourceCoord[1] - targetCoord[1]);
		// console.log(`[${sourceCoord[0]}-${sourceCoord[1]}] -> [${targetCoord[0]}-${targetCoord[1]}]: ${distance}`);
		sum += distance;
	}
}

console.log(sum);
