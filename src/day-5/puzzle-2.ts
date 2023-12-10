import { chunk, cloneDeep, floor } from 'lodash';
import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`).filter((line) => !!line);

const [seedsLine, , ...rest] = input;

const seedRanges = chunk(seedsLine!.match(/(\d+)/g)!.map(Number), 2) as Array<[number, number]>;

const { content } = rest.reduce<{ currentIndex: number; content: Array<Array<[number, number, number]>> }>(
	(prev, curr) => {
		if (!/\d+ \d+ \d+/.test(curr)) {
			return {
				...prev,
				currentIndex: prev.currentIndex + 1,
			};
		}

		const newContent = cloneDeep(prev.content);
		newContent[prev.currentIndex] = [
			...(prev.content[prev.currentIndex] ?? []),
			curr.match(/(\d+)/g)!.map(Number) as [number, number, number],
		];

		return { ...prev, content: newContent };
	},
	{ currentIndex: 0, content: [] },
);

const [seedSoil, soilFert, fertWater, waterLight, lightTemp, tempHum, humLoc] = content as [
	Array<[number, number, number]>,
	Array<[number, number, number]>,
	Array<[number, number, number]>,
	Array<[number, number, number]>,
	Array<[number, number, number]>,
	Array<[number, number, number]>,
	Array<[number, number, number]>,
];

let minLoc: number = 0;
while (true) {
	if (minLoc % 100000 === 0) {
		console.log(floor(minLoc / 100000));
	}

	const hum = reverseLookUp(minLoc, humLoc);
	const temp = reverseLookUp(hum, tempHum);
	const light = reverseLookUp(temp, lightTemp);
	const water = reverseLookUp(light, waterLight);
	const fert = reverseLookUp(water, fertWater);
	const soil = reverseLookUp(fert, soilFert);
	const seed = reverseLookUp(soil, seedSoil);
	if (seedLookup(seed)) {
		break;
	}
	minLoc++;
}
console.log(minLoc);

function reverseLookUp(value: number, map: Array<[number, number, number]>): number {
	for (let entry of map) {
		const [dest, source, range] = entry;
		if (value < dest) {
			continue;
		}
		const maxDest = dest + range - 1;
		if (value <= maxDest) {
			return source + (value - dest);
		}
	}

	return value;
}

function seedLookup(seed: number): boolean {
	return seedRanges.some((range) => seed >= range[0] && seed <= range[0] + range[1] - 1);
}
