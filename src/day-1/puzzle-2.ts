import { first, last } from 'lodash';
import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const digits = input.map((line) => {
	const matches: Array<string> = [];
	for (let i = 0; i < line.length; i++) {
		const match = line.substring(i).match(/^(\d|one|two|three|four|five|six|seven|eight|nine)/m);
		if (match) {
			matches.push(match[0]);
		}
	}
	return matches;
});
const numbers = digits.map((digit) => {
	const firstDigit = getNumber(first(digit)!);
	const lastDigit = getNumber(last(digit)!);
	return Number(`${firstDigit}${lastDigit}`);
});
const sum = numbers.reduce((sum, curr) => sum + curr, 0);
console.log(sum);

function getNumber(s: string) {
	const parsed = Number(s);
	if (!isNaN(parsed)) {
		return parsed;
	}

	switch (s) {
		case 'one':
			return 1;
		case 'two':
			return 2;
		case 'three':
			return 3;
		case 'four':
			return 4;
		case 'five':
			return 5;
		case 'six':
			return 6;
		case 'seven':
			return 7;
		case 'eight':
			return 8;
		case 'nine':
			return 9;
		default:
			throw new Error();
	}
}
