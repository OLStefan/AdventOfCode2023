import { isEmpty } from 'lodash';
import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const formatted = input.map((line) => line.replace(/Card \d+: /, ''));
const cards = formatted.map((line) => {
	const [wins, numbers] = line.split(' | ');

	return {
		winningNumbers: wins!
			.split(' ')
			.flatMap((number) => (isEmpty(number) ? [] : number))
			.map(Number),
		cardNumbers: numbers!
			.split(' ')
			.flatMap((number) => (isEmpty(number) ? [] : number))
			.map(Number),
	};
});

const cardScores = cards.map((card) => {
	const wins = card.cardNumbers.filter((n) => card.winningNumbers.includes(n)).length;

	if (!wins) {
		return 0;
	}

	return 2 ** (wins - 1);
});

const sum = cardScores.reduce((sum, curr) => sum + curr, 0);
console.log(sum);
