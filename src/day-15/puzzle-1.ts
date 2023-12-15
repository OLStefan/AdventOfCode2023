import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const commands = input[0]!.split(',');

const hashes = commands.map((c) =>
	c.split('').reduce((sum, curr) => {
		return ((sum + curr.charCodeAt(0)) * 17) % 256;
	}, 0),
);

const sum = hashes.reduce((sum, curr) => sum + curr, 0);
console.log(sum);
