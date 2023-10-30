import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";
import { exit } from "process";

async function mane() {
	const input = await get_input(2015, 1);
	let level = 0;
	let basement_enter: number;
	[...input].forEach(function (char, i) {
		if (char === "(") {
			level += 1;
		} else if (char === ")") {
			level -= 1;
		}
		if (!basement_enter && level === -1) {
			basement_enter = i + 1;
		}
  });
  console.log("Part 1: " + level);
  console.log("Part 2: " + basement_enter!);
}

mane();
