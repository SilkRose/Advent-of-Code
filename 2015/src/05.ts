import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 5)).trim().split("\n");
	let nice_count_one = 0;
	let nice_count_two = 0;
	for (let string of input) {
		if (check_rule_set_one(string)) nice_count_one++;
		if (check_rule_set_two(string)) nice_count_two++;
	}
	console.log("Part 1: " + nice_count_one);
	console.log("Part 2: " + nice_count_two);
}

function check_rule_set_one(string: string): boolean {
	const bad = string.match(/ab|cd|pq|xy/gi);
	const bad_count = bad ? bad.length : 0;
	if (bad_count > 0) {
		return false;
	}
	const vowels = string.match(/[aeiou]/gi);
	const count = vowels ? vowels.length : 0;
	if (count < 3) {
		return false;
	}
	for (let i = 0; i < [...string].length; i++) {
		if (i === 0) continue;
		if ([...string][i] === [...string][i - 1]) {
			return true;
		}
	}
	return false;
}

function check_rule_set_two(string: string): boolean {
	let two_double = false;
	for (let i = 0; i < [...string].length; i++) {
		for (let j = i + 2; j < [...string].length; j++) {
			if (
				string
					.slice(j, [...string].length)
					.includes(string.slice(i, i + 2))
			) {
				two_double = true;
				break;
			}
		}
	}
	let double = false;
	for (let i = 0; i < [...string].length; i++) {
		if (i <= 2) continue;
		if ([...string][i] === [...string][i - 2]) {
			double = true;
			break;
		}
	}
	if (two_double && double) return true;
	return false;
}

mane();
