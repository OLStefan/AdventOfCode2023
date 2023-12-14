import { cloneDeep, last } from 'lodash';
import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

type Coord = [number, number];

const rocks = input.reduce<Array<Coord>>(
	(prev, line, index) => [...prev, ...line.split('').flatMap<Coord>((c, i) => (c === 'O' ? [[index, i]] : []))],
	[],
);

const blocks = input.reduce<Array<Coord>>(
	(prev, line, index) => [...prev, ...line.split('').flatMap<Coord>((c, i) => (c === '#' ? [[index, i]] : []))],
	[],
);

function tiltNorth() {
	rocks.sort(([a1], [b1]) => a1 - b1);
	for (let i = 0; i < rocks.length; i++) {
		const [row, col] = rocks[i]!;

		const relevantBlocks = blocks.filter(([r, c]) => c === col && r < row).sort(([a1], [b1]) => a1 - b1);
		const relevantRocks = rocks.filter(([r, c]) => c === col && r < row);
		const block = last(relevantBlocks);
		if (block) {
			const newRow = block[0] + relevantRocks.filter(([r]) => r > block[0]).length + 1;
			rocks[i] = [newRow, col];
			continue;
		}

		const newRow = Math.min(row, relevantRocks.length);
		rocks[i] = [newRow, col];
	}
}
function tiltEast() {
	rocks.sort(([, a2], [, b2]) => b2 - a2);
	for (let i = 0; i < rocks.length; i++) {
		const [row, col] = rocks[i]!;

		const relevantBlocks = blocks.filter(([r, c]) => r === row && c > col).sort(([, a2], [, b2]) => b2 - a2);
		const relevantRocks = rocks.filter(([r, c]) => r === row && c > col);
		const block = last(relevantBlocks);
		if (block) {
			const newCol = block[1] - relevantRocks.filter(([, c]) => c < block[1]).length - 1;
			rocks[i] = [row, newCol];
			continue;
		}

		const newCol = Math.max(col, input[0]!.length - 1 - relevantRocks.length);
		rocks[i] = [row, newCol];
	}
}
function tiltSouth() {
	rocks.sort(([a1], [b1]) => b1 - a1);
	for (let i = 0; i < rocks.length; i++) {
		const [row, col] = rocks[i]!;

		const relevantBlocks = blocks.filter(([r, c]) => c === col && r > row).sort(([a1], [b1]) => b1 - a1);
		const relevantRocks = rocks.filter(([r, c]) => c === col && r > row);
		const block = last(relevantBlocks);
		if (block) {
			const newRow = block[0] - relevantRocks.filter(([r]) => r < block[0]).length - 1;
			rocks[i] = [newRow, col];
			continue;
		}

		const newRow = Math.max(row, input.length - 1 - relevantRocks.length);
		rocks[i] = [newRow, col];
	}
}
function tiltWest() {
	rocks.sort(([, a2], [, b2]) => a2 - b2);
	for (let i = 0; i < rocks.length; i++) {
		const [row, col] = rocks[i]!;

		const relevantBlocks = blocks.filter(([r, c]) => r === row && c < col).sort(([, a2], [, b2]) => a2 - b2);
		const relevantRocks = rocks.filter(([r, c]) => r === row && c < col);
		const block = last(relevantBlocks);
		if (block) {
			rocks[i] = [row, block[1] + relevantRocks.filter(([, c]) => c > block[1]).length + 1];
			continue;
		}

		const newCol = Math.min(col, relevantRocks.length);
		rocks[i] = [row, newCol];
	}
}

let lastRocks: Array<Coord> = [];

for (let cycle = 1; cycle <= 1000 /*000000*/; cycle++) {
	console.log('-----', cycle, '-----');

	lastRocks = cloneDeep(rocks);
	// printRocks();
	// console.log(rocks);
	// console.log('-----');
	tiltNorth();

	// printRocks();
	// // console.log(rocks);
	// console.log('-----');
	tiltWest();

	// printRocks();
	// console.log(rocks);
	// console.log('-----');
	tiltSouth();

	// printRocks();
	// console.log(rocks);
	// console.log('-----');
	tiltEast();
}

function printRocks() {
	console.log(
		` ${Array(input[0]!.length)
			.fill(undefined)
			.map((_, i) => i % 10)
			.join('')}`,
	);
	for (let i = 0; i < input.length; i++) {
		const chars: Array<string> = [`${i}`];
		for (let j = 0; j < input[0]!.length; j++) {
			if (rocks.some(([a, b]) => a === i && b === j)) {
				chars.push('O');
				continue;
			}
			if (blocks.some(([a, b]) => a === i && b === j)) {
				chars.push('#');
				continue;
			}
			chars.push('.');
		}
		console.log(chars.join(''));
	}
}

const sum = rocks.map(([r]) => input.length - r);
console.log(sum);
console.log(sum.reduce((s, r) => r + s, 0));
