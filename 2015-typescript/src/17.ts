import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 17)).trim().split("\n");
	const amount = 150;
	const containers = input.map((i) => Number(i)).sort((a, b) => b - a);
	const [part_one, lengths] = combination(containers, amount, [], 0, []);
	const length = lengths.sort((a, b) => a - b)[0];
	const part_two = lengths.filter((l) => l === length).length;
	console.log("Part 1: " + part_one);
	console.log("Part 2: " + part_two);
}

function combination(
	containers: number[],
	amount: number,
	seen: number[],
	combinations: number,
	lengths: number[]
): [number, number[]] {
	let total = 0;
	for (let i = 0; i <= seen.length - 1; i++) {
		total += containers[seen[i]];
	}
	if (total === amount)
		return [combinations + 1, lengths.concat(seen.length)];
	if (total > amount) return [combinations, lengths];
	const index = seen.sort((a, b) => b - a)[0] | 0;
	if (total < amount) {
		for (let c = index; c <= containers.length - 1; c++) {
			if (seen.includes(c)) continue;
			if (total + containers[c] > amount) continue;
			const local = seen.concat(c);
			[combinations, lengths] = combination(
				containers,
				amount,
				local,
				combinations,
				lengths
			);
		}
	}
	return [combinations, lengths];
}

mane();
