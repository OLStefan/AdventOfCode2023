import { cloneDeep, min } from 'lodash';
import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`).filter((line) => !!line);

const [seedsLine, , ...rest] = input;

const seeds = seedsLine!.match(/(\d+)/g)!.map(Number);

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

const locations = seeds.map((seed) => {
	const soil = lookUp(seed, seedSoil);
	const fert = lookUp(soil, soilFert);
	const water = lookUp(fert, fertWater);
	const light = lookUp(water, waterLight);
	const temp = lookUp(light, lightTemp);
	const hum = lookUp(temp, tempHum);
	const loc = lookUp(hum, humLoc);
	return loc;
});

console.log(min(locations));

function lookUp(value: number, map: Array<[number, number, number]>): number {
	for (let entry of map) {
		const [dest, source, range] = entry;
		if (value < source) {
			continue;
		}
		const maxSource = source + range - 1;
		if (value <= maxSource) {
			return dest + (value - source);
		}
	}

	return value;
}
