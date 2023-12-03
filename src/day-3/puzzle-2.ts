import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

type Coordinate = { row: number; column: number };
const potentialGears: Array<Coordinate> = [];

input.forEach((row, index) => {
	const gearMatches = [...row.matchAll(/\*/g)];
	if (gearMatches) {
		gearMatches.forEach((match) => {
			potentialGears.push({ row: index, column: match.index! });
		});
	}
});

const ratios: Array<number> = [];
potentialGears.forEach((gear) => {
	const digits = findDigit(gear);
	if (digits.length !== 2) {
		return;
	}
	const numbers = digits.map(findNumber);
	ratios.push(numbers[0]! * numbers[1]!);
});

const sum = ratios.reduce((sum, curr) => sum + curr, 0);
console.log(sum);

function findDigit({ row, column }: Coordinate) {
	const coords: Array<Coordinate> = getSurroundingCoords({ row, column });
	const digits: Array<Coordinate> = [];
	coords.forEach((coordinate) => {
		const char = input[coordinate.row]?.charAt(coordinate.column);
		if (char && char.match(/\d/)) {
			digits.push(coordinate);
		}
	});
	return digits.filter((c) => {
		return !digits.some(
			(coordinate) => c.row === coordinate.row && c.row !== row && c.column === coordinate.column - 1,
		);
	});
}

function getSurroundingCoords({ row, column }: Coordinate) {
	const coords: Array<Coordinate> = [];
	coords.push({ row: row - 1, column: column - 1 });
	coords.push({ row: row - 1, column });
	coords.push({ row: row - 1, column: column + 1 });
	coords.push({ row, column: column - 1 });
	coords.push({ row, column: column + 1 });
	coords.push({ row: row + 1, column: column - 1 });
	coords.push({ row: row + 1, column });
	coords.push({ row: row + 1, column: column + 1 });
	return coords;
}

function findNumber(coord: Coordinate): number {
	const digits = [input[coord.row]!.charAt(coord.column)];

	for (let i = coord.column - 1; i >= 0; i--) {
		const char = input[coord.row]?.charAt(i);
		if (char && char.match(/\d/)) {
			digits.unshift(char);
			continue;
		}
		break;
	}
	for (let i = coord.column + 1; i <= input[coord.row]!.length - 1; i++) {
		const char = input[coord.row]?.charAt(i);
		if (char && char.match(/\d/)) {
			digits.push(char);
			continue;
		}
		break;
	}

	return Number(digits.join(''));
}
