import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 5)).trim().split("\n");
	let nice: string[] = [];
	let naughty: string[] = [];
	for (let string of input) {
		if (string.includes("ab")
			|| string.includes("cd")
			|| string.includes("pq")
			|| string.includes("xy")) {
			naughty.push(string);
			continue
		}
		const vowels = string.match(/[aeiou]/gi);
		const count = vowels ? vowels.length : 0
		if ((count < 3)) {
			naughty.push(string);
			continue
		}
		let double = false;
		for (let i = 0; i < [...string].length; i++) {
			if (i === 0) continue
			if ([...string][i] === [...string][i - 1]) {
				double = true
				break
			}
		}
		if (double) nice.push(string);
		if (!double) naughty.push(string);
	}
	console.log(nice.length);
}

mane();
