import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

type Levels = { [key: string]: { [key: string]: number } };

async function mane() {
	const input = (await get_input(2015, 13)).trim().split("\n");
	const people = get_people(input);
	const happiness = get_happiness_levels(people, input);
	const happiest = get_levels([], people, happiness, []).sort(
		(a, b) => b - a
	)[0];
	console.log(happiest);
	const new_input = input
		.concat(
			people.map(
				(p) =>
					`You would gain 0 happiness units by sitting next to ${p}.`
			)
		)
		.concat(
			people.map(
				(p) =>
					`${p} would gain 0 happiness units by sitting next to You.`
			)
		)
		.sort();
	const new_people = get_people(new_input);
	const new_happiness = get_happiness_levels(new_people, new_input);
	const new_happiest = get_levels([], new_people, new_happiness, []).sort(
		(a, b) => b - a
	)[0];
	console.log(new_happiest);
}

function get_people(input: string[]): string[] {
	return Array.from(
		new Set(
			input
				.flatMap((l) =>
					l
						.replace(
							/ would (gain|lose) [0-9]* happiness units by sitting next to /g,
							","
						)
						.replace(/ = [0-9]+|\./g, "")
						.split(",")
				)
				.sort()
		)
	);
}

function get_happiness_levels(people: string[], input: string[]): Levels {
	let levels: Levels = {};
	for (let person1 of people) {
		levels[person1] = {};
		for (let person2 of people) {
			if (person1 === person2) continue;
			for (let string of input) {
				if (string.startsWith(person1) && string.includes(person2)) {
					if (string.includes("lose")) {
						levels[person1][person2] =
							Number(string.split(" ")[3]) * -1;
					} else {
						levels[person1][person2] = Number(string.split(" ")[3]);
					}
					break;
				}
			}
		}
	}
	return levels;
}

function get_levels(
	sitting: string[],
	people: string[],
	map: Levels,
	levels: number[]
): number[] {
	const standing = people.filter((p) => !sitting.includes(p));
	if (standing.length === 0)
		return levels.concat(calc_happiness(sitting, map));
	for (let person of standing) {
		let local = sitting.concat(person);
		levels = Array.from(
			new Set(levels.concat(get_levels(local, people, map, levels)))
		);
	}
	return levels;
}

function calc_happiness(people: string[], map: Levels): number {
	let happiness = 0;
	for (let c = 0; c < people.length; c++) {
		if (c === 0) {
			happiness += map[people[c]][people[people.length - 1]];
			happiness += map[people[c]][people[c + 1]];
		} else if (c === people.length - 1) {
			happiness += map[people[c]][people[c - 1]];
			happiness += map[people[c]][people[0]];
		} else {
			happiness += map[people[c]][people[c - 1]];
			happiness += map[people[c]][people[c + 1]];
		}
	}
	return happiness;
}

mane();
