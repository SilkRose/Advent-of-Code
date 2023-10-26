import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 6)).trim().split("\n");
	let lights: boolean[][] = [];
	for (let x = 0; x <= 999; x++) {
		let column: boolean[] = [];
		for (let y = 0; y <= 999; y++) {
			column.push(false);
		}
		lights.push(column)
	}
	for (let string of input) {
		const formated = string.replace(" through ", ",").replace(/^\D+/g, '');
		const [sx, sy, ex, ey] = formated.split(",").map(Number);
		for (let x = sx; x <= ex; x++) {
			for (let y = sy; y <= ey; y++) {
				if (string.startsWith("turn on")) {
					lights[x][y] = true;
				} else if (string.startsWith("turn off")) {
					lights[x][y] = false;
				} else if (string.startsWith("toggle")) {
					lights[x][y] = !lights[x][y];
				}
			}
		}
	}
	console.log(lights.flat(1).filter(c => c).length);
}

mane();
