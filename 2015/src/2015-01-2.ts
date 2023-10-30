import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";
import { exit } from "process";

async function mane() {
	const input = await get_input(2015, 1);
	let level = 0;
	[...input].forEach(function (char, i) {
		if (char === "(") {
			level += 1;
		} else if (char === ")") {
			level -= 1;
		}
		if (level === -1) {
			console.log(i + 1);
			exit(0)
		}
  });
}

mane();
