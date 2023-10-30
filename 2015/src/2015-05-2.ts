import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 5)).trim().split("\n");
	let nice: string[] = [];
	let naughty: string[] = [];
	for (let string of input) {
		let two_double = false;
		for (let i = 0; i < [...string].length; i++) {
			for (let j = i + 2; j < [...string].length; j++) {
				if (string.slice(j, [...string].length).includes(string.slice(i, i + 2))) {
					two_double = true
					break
				}
			}
		}
		let double = false;
		for (let i = 0; i < [...string].length; i++) {
			if (i <= 2) continue
			if ([...string][i] === [...string][i - 2]) {
				double = true
				break
			}
		}
		if (two_double && double) nice.push(string);
		if (!two_double || !double) naughty.push(string);
	}
	console.log(nice.length);
}

mane();
