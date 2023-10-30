import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = await get_input(2015, 1);
	let level = 0
	for (let i of [...input]) {
		if (i === "(") {
			level += 1;
		} else if (i === ")") {
			level -= 1;
		}
	}
	console.log(level);
}

mane();
