import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 17)).trim().split("\n");
	const amount = 150;
	const containers = input.map((i) => Number(i)).sort((a, b) => b - a);
	const part_one = combination(containers, amount, []);
	console.log("Part 1: " + part_one);
}

function combination(
	containers: number[],
	amount: number,
	seen: number[]
): number {
	let combinations = 0;
	let total = 0;
	for (let i = 0; i <= seen.length - 1; i++) {
		total += containers[seen[i]];
	}
	if (total === amount) return 1;
	if (total > amount) return 0;
	const index = seen.sort((a, b) => b - a)[0] | 0;
	if (total < amount) {
		for (let c = index; c <= containers.length - 1; c++) {
			if (seen.includes(c)) continue;
			if (total + containers[c] > amount) continue;
			const local = seen.concat(c);
			combinations += combination(containers, amount, local);
		}
	}
	return combinations;
}

mane();
