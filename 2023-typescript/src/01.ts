import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

// https://adventofcode.com/2023/day/1

const stringToNumberMap: Map<string, number> = new Map([
	["zero", 0],
	["0", 0],
	["one", 1],
	["1", 1],
	["two", 2],
	["2", 2],
	["three", 3],
	["3", 3],
	["four", 4],
	["4", 4],
	["five", 5],
	["5", 5],
	["six", 6],
	["6", 6],
	["seven", 7],
	["7", 7],
	["eight", 8],
	["8", 8],
	["nine", 9],
	["9", 9]
]);

mane();

async function mane() {
	await solve1("a");
	await solve1("s");
	await solve2("a");
	await solve2("s");
}

async function solve1(pony: string) {
	const input = (await get_input(pony, 2023, 1)).trim();
	const part1 = input
		.split("\n")
		.map((l) => {
			const numbers = l.replaceAll(/[a-zA-Z]/g, "");
			const first = numbers.split("")[0];
			const last = numbers.split("")[numbers.length - 1];
			return Number(`${first}${last}`);
		})
		.reduce((a, b) => a + b);

	console.log(`${pony} Part 1: ${part1}`);
}

async function solve2(pony: string) {
	const input = (await get_input(pony, 2023, 1)).trim();
	const part2 = input
		.split("\n")
		.map((l) => {
			const numbers = l.split("").map((c, i) => {
				if (Number(c)) return Number(c);
				console.log(l)
				for (const item of stringToNumberMap) {
					console.log(l.slice(i, item[0].length));
					if (l.slice(i, item[0].length - 1) == item[0]) {
						console.log("wow it worked!");
						return item[1];
					}
				}
				return
			}).toString();
			const first = numbers.split("")[0];
			const last = numbers.split("")[numbers.length - 1];
			return Number(`${first}${last}`);
		})
		.reduce((a, b) => a + b);

	console.log(`${pony} Part 2: ${part2}`);
}
