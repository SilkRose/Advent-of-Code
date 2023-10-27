import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 8)).trim().split("\n");
	let code_chars = 0;
	let text_chars = 0;
	for (let string of input) {
		code_chars += [...string].length;
		text_chars += [
			...string
				.replace(/\\x[0-9A-Fa-f]{2}|\\\\|\\"/g, "B")
				.replace(/(?!\\)"/g, ""),
		].length;
	}
	console.log(code_chars - text_chars);
}

mane();
