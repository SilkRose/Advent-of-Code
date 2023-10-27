import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 8)).trim().split("\n");
	let code_chars = 0;
	let text_chars = 0;
	for (let string of input) {
		code_chars += [...string].length;
		text_chars +=
			[
				...string
					.replace(/\\x[0-9A-Fa-f]{2}/g, "BBBBB")
					.replace(/\\\\|\\"/g, "BBBB")
					.replace(/(?!\\)"|\\/g, "BB"),
			].length + 2;
	}
	console.log(text_chars - code_chars);
}

mane();
