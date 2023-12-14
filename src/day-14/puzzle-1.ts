import { last } from 'lodash';
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

for (let i = 0; i < rocks.length; i++) {
	const rock = rocks[i]!;
	const row = rock[0];

	const relevantBlocks = blocks.filter(([r, col]) => r < row && col === rock[1]);
	const relevantRocks = rocks.filter(([r, col]) => col === rock[1] && r < row);
	const block = last(relevantBlocks);
	if (block) {
		rocks[i] = [block[0] + relevantRocks.filter(([r]) => r > block[0]).length + 1, rock[1]];
		continue;
	}

	const newRow = Math.min(row, relevantRocks.length)!;
	rocks[i] = [newRow, rock[1]];
}

console.log(rocks.sort(([a1, a2], [b1, b2]) => a1 - b1 || a2 - b2));

const sum = rocks.map(([r]) => input.length - r);
console.log(sum);
console.log(sum.reduce((s, r) => r + s, 0));
