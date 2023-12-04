import { isEmpty, slice } from 'lodash';
import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

interface Card {
	winningNumbers: number[];
	cardNumbers: number[];
}

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
	return card.cardNumbers.filter((n) => card.winningNumbers.includes(n)).length;
});

const totalScores: Array<number> = Array(cardScores.length).fill(0);

for (let i = cardScores.length - 1; i >= 0; i--) {
	const score = cardScores[i]!;
	const sliced = slice(totalScores, i + 1, i + score + 1);
	console.log(totalScores, score, sliced);

	const totalScore = 1 + sliced.reduce((sum, curr) => sum + curr, 0);
	totalScores[i] = totalScore;
}

const sum = totalScores.reduce((sum, curr) => sum + curr, 0);
console.log(sum);
