import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

type Lights = [boolean, number][][];

async function mane() {
	const input = (await get_input(2015, 6)).trim().split("\n");
	let lights: Lights = [];
	for (let x = 0; x <= 999; x++) {
		let column: [boolean, number][] = [];
		for (let y = 0; y <= 999; y++) {
			column.push([false, 0]);
		}
		lights.push(column);
	}
	for (let string of input) {
		const formated = string.replace(" through ", ",").replace(/^\D+/g, "");
		const [sx, sy, ex, ey] = formated.split(",").map(Number);
		for (let x = sx; x <= ex; x++) {
			for (let y = sy; y <= ey; y++) {
				if (string.startsWith("turn on")) {
					lights[x][y][0] = true;
					lights[x][y][1] += 1;
				} else if (string.startsWith("turn off")) {
					lights[x][y][0] = false;
					lights[x][y][1] =
						lights[x][y][1] >= 1 ? lights[x][y][1] - 1 : 0;
				} else if (string.startsWith("toggle")) {
					lights[x][y][0] = !lights[x][y][0];
					lights[x][y][1] += 2;
				}
			}
		}
	}
	const part1 = lights.flat(1).filter((c) => c[0]).length;
	const part2 = lights.flat(1).reduce((a, b) => a + b[1], 0);
	console.log("Part 1: " + part1);
	console.log("Part 2: " + part2);
}

mane();
