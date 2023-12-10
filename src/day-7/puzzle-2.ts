import { countBy, max, uniq } from 'lodash';
import readAsLines from '../utils/readAsLines';

const CARDS = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'] as const;
type Card = (typeof CARDS)[number];
type Hand = [Card, Card, Card, Card, Card];
const input = readAsLines(`${__dirname}/input.txt`);

const hands = input.map((line) => {
	const [match] = line.match(/(.{5}) (\d+)/g)!;
	const [hand, bid] = match.split(' ');
	return { hand: hand!.split('') as Hand, bid: Number(bid!) };
});

const sortedHands = hands.sort(({ hand: a }, { hand: b }) => {
	const aScore = jokerScore(a);
	const bScore = jokerScore(b);
	if (aScore !== bScore) {
		return aScore - bScore;
	}

	for (let i = 0; i < a.length; i++) {
		const aIndex = CARDS.indexOf(a[i]!);
		const bIndex = CARDS.indexOf(b[i]!);
		if (aIndex !== bIndex) {
			return aIndex - bIndex;
		}
	}

	return 0;
});

const score = sortedHands.map(({ bid }, index) => bid * (index + 1)).reduce((sum, curr) => sum + curr, 0);
console.log(score);

function jokerScore(hand: Hand) {
	const possibleScores = CARDS.filter((c) => c !== 'J').map((replacement) =>
		handScore(hand.map((c) => (c === 'J' ? replacement : c)) as Hand),
	);
	return max(possibleScores)!;
}

function handScore(hand: Hand) {
	if (uniq(hand).length === 1) {
		return 7; // Five of a kind
	}
	if (uniq(hand).length === 2) {
		if (max(Object.values(countBy(hand))) === 4) {
			return 6; // Four of a kind
		}
		return 5; // Full house
	}
	if (uniq(hand).length === 3) {
		if (max(Object.values(countBy(hand))) === 3) {
			return 4; // Three of a kind
		}
		return 3; // Two Pairs
	}
	if (uniq(hand).length === 4) {
		return 2; // One Pair
	}

	return 1; // High Card
}
