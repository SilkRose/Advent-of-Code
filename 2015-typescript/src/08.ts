import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 8)).trim().split("\n");
	let part_one = 0;
	let part_two = 0;
	for (let string of input) {
		part_one += string.length;
		part_one -= string
			.replace(/\\x[0-9A-Fa-f]{2}|\\\\|\\"/g, "h")
			.replace(/(?!\\)"/g, "").length;
		part_two -= string.length;
		part_two +=
			string
				.replace(/\\x[0-9A-Fa-f]{2}/g, "hhhhh")
				.replace(/\\\\|\\"/g, "hhhh")
				.replace(/(?!\\)"|\\/g, "hh").length + 2;
	}
	console.log("Part 1: " + part_one);
	console.log("Part 2: " + part_two);
}

mane();
