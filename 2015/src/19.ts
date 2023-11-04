import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 19)).trim().split("\n\n");
	const replacements = input[0].split("\n").map((l) => l.split(" => "));
	const molecule = input[1];
	const permutations = get_permutations(replacements, molecule);
	const part_one = permutations.length;
	console.log("Part 1: " + part_one);
}

function get_permutations(
	replacements: string[][],
	molecule: string
): string[] {
	let permutations: string[] = [];
	for (let c = 0; c < molecule.length; c++) {
		const start = molecule.slice(0, c);
		const end = molecule.slice(c, molecule.length);
		for (const rp of replacements) {
			if (end.startsWith(rp[0])) {
				permutations.push(start + end.replace(rp[0], rp[1]));
			}
		}
	}
	return Array.from(new Set([...permutations]));
}

mane();
