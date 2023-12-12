import { isEqual } from 'lodash';
import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const data = input.map((line) => {
	const result = line.split(' ')[0]!.split('');
	const numbers = line.split(' ')[1]!.split(',').map(Number);

	return {
		result,
		numbers,
	};
});

const counts = data.map(testPermutations);
const sum = counts.reduce((sum, curr) => sum + curr, 0);
console.log(sum);

function testPermutations({ result, numbers }: (typeof data)[number]) {
	const permutations = createPermutations([result.join('')]);
	return permutations.filter((p) => checkString(p, numbers)).length;
}

function createPermutations(result: Array<string>): Array<string> {
	if (!result[0]!.includes('?')) {
		return result;
	}

	return createPermutations(result.flatMap((r) => [r.replace('?', '.'), r.replace('?', '#')]));
}

function checkString(toCheck: string, number: Array<number>): boolean {
	const count = countConsecutive(toCheck);
	return isEqual(count, number);
}

function countConsecutive(toCheck: string): Array<number> {
	return toCheck
		.split('.')
		.filter((s) => !!s)
		.map((s) => s.length);
}
