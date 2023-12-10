import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const [times, distances] = input.map((line) => line.match(/(\d+)/g)!.map(Number)) as [Array<number>, Array<number>];

const waysToWin = times.map((time, i) => {
	const distance = distances[i]!;
	const wins: Array<number> = [];

	for (let i = 1; i < time; i++) {
		const travelled = (time - i) * i;
		if (travelled > distance) {
			wins.push(i);
		}
	}
	console.log(wins);

	return wins.length;
});

const prod = waysToWin.reduce((prod, curr) => prod * curr, 1);
console.log(prod);
