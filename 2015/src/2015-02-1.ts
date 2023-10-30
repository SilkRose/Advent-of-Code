import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 2)).trim().split("\n");
	let area = 0;
	for (let box of input) {
		let [l, w, h] = box.split("x").map(Number);
		let areas = [(l * w * 2), (w * h * 2), (h * l * 2)]
		area += areas.reduce((a, b) => a + b) + (areas.sort((a, b) => a - b)[0] / 2);
	}

	console.log(area);
}

mane();
