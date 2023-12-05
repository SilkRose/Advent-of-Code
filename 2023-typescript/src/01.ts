import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

// https://adventofcode.com/2023/day/1

mane();

async function mane() {
	const input = (await get_input(2023, 1)).trim();
	const part1 = input
		.split("\n")
		.map((l) => {
			const numbers = l.replaceAll(/[a-zA-Z]/g, "");
			const first = numbers.split("")[0];
			const last = numbers.split("")[numbers.length - 1];
			return Number(`${first}${last}`);
		})
		.reduce((a, b) => a + b);

	console.log("Part 1: " + part1);
	console.log("Part 2: ");
}
