import readAsLines from '../utils/readAsLines';

const input = readAsLines(`${__dirname}/input.txt`);

const gameData = input.map((game) => {
	const [gameId, gameResults] = game.split(':');
	const id = Number(gameId!.match(/Game (\d+)/)![1]);
	const games = gameResults!.split(';').map((hint) => hint.split(',').map((s) => s.trim()));

	const gameReq = games.reduce(
		(prev, curr) => {
			const result = curr.reduce(
				(sum, c) => {
					const redCheck = c.match(/(\d+) red/);
					if (redCheck) {
						return {
							...sum,
							r: Number(redCheck[1]),
						};
					}
					const blueCheck = c.match(/(\d+) blue/);
					if (blueCheck) {
						return {
							...sum,
							b: Number(blueCheck[1]),
						};
					}
					const greenCheck = c.match(/(\d+) green/);
					if (greenCheck) {
						return {
							...sum,
							g: Number(greenCheck[1]),
						};
					}
					return prev;
				},
				{ r: 0, b: 0, g: 0 },
			);

			return {
				r: Math.max(prev.r, result.r),
				b: Math.max(prev.b, result.b),
				g: Math.max(prev.g, result.g),
			};
		},
		{ r: 0, b: 0, g: 0 },
	);

	return {
		id,
		gameReq,
	};
});

console.log(gameData);

const answer = gameData.map(({ gameReq }) => gameReq.r * gameReq.g * gameReq.b).reduce((sum, curr) => sum + curr, 0);
console.log(answer);
