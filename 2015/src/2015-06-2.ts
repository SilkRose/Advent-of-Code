import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 6)).trim().split("\n");
	let lights: number[][] = [];
	for (let x = 0; x <= 999; x++) {
		let column: number[] = [];
		for (let y = 0; y <= 999; y++) {
			column.push(0);
		}
		lights.push(column)
	}
	for (let string of input) {
		const formated = string.replace(" through ", ",").replace(/^\D+/g, '');
		const [sx, sy, ex, ey] = formated.split(",").map(Number);
		for (let x = sx; x <= ex; x++) {
			for (let y = sy; y <= ey; y++) {
				if (string.startsWith("turn on")) {
					lights[x][y] += 1;
				} else if (string.startsWith("turn off")) {
					lights[x][y] = lights[x][y] >= 1 ? lights[x][y] - 1 : 0;
				} else if (string.startsWith("toggle")) {
					lights[x][y] += 2;
				}
			}
		}
	}
	console.log(lights.flat(1).reduce((a, b) => a + b, 0));
}

mane();
