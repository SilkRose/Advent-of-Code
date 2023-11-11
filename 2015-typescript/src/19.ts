import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

type Molecule = { [key: string]: number };

async function mane() {
	const input = (await get_input(2015, 19)).trim().split("\n\n");
	const replacements = input[0]
		.split("\n")
		.map((l) => l.split(" => "))
		.sort((a, b) => b[1].length - a[1].length);
	const molecule = input[1];
	const permutations = get_permutations(replacements, molecule);
	const part_one = permutations.length;
	const part_two = reverse_permutations(
		replacements,
		molecule,
		{},
		0,
		Infinity
	);
	console.log("Part 1: " + part_one);
	console.log("Part 2: " + part_two);
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

function reverse_permutations(
	replacements: string[][],
	molecule: string,
	molecules: Molecule,
	steps: number,
	min_steps: number
): number {
	if (molecule === "e") {
		if (steps <= min_steps) return steps;
		return min_steps;
	}
	if (steps >= min_steps) return min_steps;
	for (let c = molecule.length; c >= 0; c--) {
		const start = molecule.slice(0, c);
		const end = molecule.slice(c, molecule.length);
		for (const rp of replacements) {
			if (end.startsWith(rp[1])) {
				const local_step = steps + 1;
				const local_molecule = start + end.replace(rp[1], rp[0]);
				if (
					molecules[local_molecule] &&
					molecules[local_molecule] <= local_step
				)
					return min_steps;
				molecules[local_molecule] = local_step;
				min_steps = reverse_permutations(
					replacements,
					local_molecule,
					molecules,
					local_step,
					min_steps
				);
			}
		}
	}
	return min_steps;
}

mane();
