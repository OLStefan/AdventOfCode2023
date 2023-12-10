import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const [time, distance] = input.map((line) => Number(line.match(/(\d+)/g)!.join(''))) as [number, number];

const wins: Array<number> = [];

for (let i = 1; i < time; i++) {
	const travelled = (time - i) * i;
	if (travelled > distance) {
		wins.push(i);
	}
}

console.log(wins.length);
