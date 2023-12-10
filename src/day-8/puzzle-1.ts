import readAsLines from '../utils/readAsLines';

const [instructionString, , ...rest] = readAsLines(`${__dirname}/input.txt`);

const instructions = instructionString!.split('') as Array<'L' | 'R'>;

const nodes = rest.reduce<Record<string, { L: string; R: string }>>((prev, line) => {
	const match = line.match(/(\w{3})/g)!;

	return {
		...prev,
		[match[0]!]: {
			L: match[1]!,
			R: match[2]!,
		},
	};
}, {});

let current = 'AAA';
let i = 0;
while (true) {
	console.log(current);
	if (current === 'ZZZ') {
		console.log(i);
		break;
	}

	current = nodes[current]![instructions[i % instructions.length]!];
	i++;
}
