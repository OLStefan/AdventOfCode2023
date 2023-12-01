import { first, last } from 'lodash';
import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const digits = input.map((line) => line.matchAll(/\d/g));
const numbers = digits.map((digit) => {
	const match = [...digit].map((d) => d[0]!);
	const firstDigit = first(match);
	const lastDigit = last(match);
	return Number(`${firstDigit}${lastDigit}`);
});
const sum = numbers.reduce((sum, curr) => sum + curr, 0);
console.log(sum);
