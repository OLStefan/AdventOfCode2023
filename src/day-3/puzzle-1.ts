import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const MIN_ROW_INDEX = 1;
const MAX_ROW_INDEX = input.length - 2;
const MIN_COLUMN_INDEX = 1;
const MAX_COLUMN_INDEX = input[0]!.length - 2;

const serialNumbers: Array<number> = [];

input.forEach((row, index) => {
	const numbers = [...row.matchAll(/(\d+)/g)];
	if (numbers) {
		numbers.forEach((match) => {
			const whole = match[0];
			const startIndex = match.index!;
			const lastIndex = startIndex + whole.length - 1;
			const indezesToCheck: Array<{ row: number; column: number }> = [];
			if (index > MIN_ROW_INDEX) {
				if (startIndex > MIN_COLUMN_INDEX) {
					indezesToCheck.push({ row: index - 1, column: startIndex - 1 });
				}
				for (let column = startIndex; column <= lastIndex; column++) {
					indezesToCheck.push({ row: index - 1, column });
				}
				if (lastIndex < MAX_COLUMN_INDEX) {
					indezesToCheck.push({ row: index - 1, column: lastIndex + 1 });
				}
			}
			if (startIndex > MIN_COLUMN_INDEX) {
				indezesToCheck.push({ row: index, column: startIndex - 1 });
			}
			if (lastIndex < MAX_COLUMN_INDEX) {
				indezesToCheck.push({ row: index, column: lastIndex + 1 });
			}
			if (index < MAX_ROW_INDEX) {
				if (startIndex > MIN_COLUMN_INDEX) {
					indezesToCheck.push({ row: index + 1, column: startIndex - 1 });
				}
				for (let column = startIndex; column <= lastIndex; column++) {
					indezesToCheck.push({ row: index + 1, column });
				}
				if (lastIndex < MAX_COLUMN_INDEX) {
					indezesToCheck.push({ row: index + 1, column: lastIndex + 1 });
				}
			}
			for (const coordinate of indezesToCheck) {
				const char = input[coordinate.row]!.charAt(coordinate.column);
				if (char && char !== '.') {
					serialNumbers.push(Number(whole));
					return;
				}
			}
		});
	}
});

const sum = serialNumbers.reduce((sum, curr) => sum + curr, 0);
console.log(sum);
