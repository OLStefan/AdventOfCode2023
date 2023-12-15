import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const commands = input[0]!.split(',');

function hash(s: string) {
	return s.split('').reduce((sum, curr) => {
		return ((sum + curr.charCodeAt(0)) * 17) % 256;
	}, 0);
}

const boxes = Array<Array<{ lens: string; value: number }>>(256).fill([]);

commands.forEach((command) => {
	const [, label, op] = command.match(/([a-z]+).(\d?)/)!;
	const box = boxes[hash(label!)]!;

	if (op) {
		const lens = { lens: label!, value: Number(op) };

		const labelsLens = box.findIndex((l) => l.lens === label);
		if (labelsLens === -1) {
			boxes[hash(label!)] = [...box, lens];
			printBoxes(command);
			return;
		}

		boxes[hash(label!)] = box.map((orig, i) => (i === labelsLens ? lens : orig));
		printBoxes(command);
		return;
	}

	boxes[hash(label!)] = box.filter((l) => l.lens !== label);
	printBoxes(command);
});

function printBoxes(command: string) {
	console.log(`After "${command}":`);
	console.log(
		boxes
			.map((b, index) => ({ index, array: b }))
			.filter(({ array }) => array.length)
			.map(({ array: b, index: i }) => `Box ${i}: ${b.map((s) => `[${s.lens} ${s.value}]`).join(' ')}`)
			.join('\n'),
	);
	console.log();
}

const sum = boxes.reduce((sum, box, index) => {
	const boxValue = box.map((curr, i) => (index + 1) * (i + 1) * curr.value).reduce((a, b) => a + b, 0);
	return sum + boxValue;
}, 0);
console.log(sum);
