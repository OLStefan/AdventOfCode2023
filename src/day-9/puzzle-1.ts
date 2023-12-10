import { last } from 'lodash';
import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const histories = input.map((line) => line.match(/(-?\d+)/g)!.map(Number));
const nextValues = histories.map((history) => {
	const diffsArray: Array<Array<number>> = [];
	do {
		diffsArray.push(diffs(last(diffsArray) ?? history));
	} while (!last(diffsArray)!.every((n) => n === 0));

	// [history, ...diffsArray].forEach((l, index) => console.log(`${Array(index).join(' ')}${l.join('  ')}`));
	return [history, ...diffsArray].map((diff) => last(diff) ?? 0).reduce((sum, curr) => sum + curr, 0);
});

const sum = nextValues.reduce((sum, curr) => sum + curr, 0);
console.log(sum);

function diffs(values: Array<number>): Array<number> {
	const diffArray: Array<number> = [];
	for (let i = 1; i < values.length; i++) {
		const diff = values[i]! - values[i - 1]!;
		diffArray.push(diff);
	}

	return diffArray;
}
