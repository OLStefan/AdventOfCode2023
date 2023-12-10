import lcm from 'lcm';
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

const starts = Object.keys(nodes).filter((key) => key.endsWith('A'));
const [first, ...minSteps] = starts.map(minStepsForNode);
const min = minSteps.reduce(lcm, first!);
console.log(min);

function minStepsForNode(start: string) {
	let current = start;
	let i = 0;
	while (true) {
		if (current.endsWith('Z')) {
			return i;
		}

		current = nodes[current]![instructions[i % instructions.length]!];
		i++;
	}
}
