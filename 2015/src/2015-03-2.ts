import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 3)).trim();
	let santa_visited = [[0, 0]];
	let robo_visited = [[0, 0]];
	for (let i = 0; i < [...input].length; i++) {
		if (i % 2 === 0) {
			const santa_last_visited = santa_visited[santa_visited.length - 1]
			if ([...input][i] === ">") {
				santa_visited.push([santa_last_visited[0] + 1, santa_last_visited[1]]);
			} else if ([...input][i] === "<") {
				santa_visited.push([santa_last_visited[0] - 1, santa_last_visited[1]]);
			} else if ([...input][i] === "^") {
				santa_visited.push([santa_last_visited[0], santa_last_visited[1] - 1]);
			} else if ([...input][i] === "v") {
				santa_visited.push([santa_last_visited[0], santa_last_visited[1] + 1]);
			}
		} else {
			const robo_last_visited = robo_visited[robo_visited.length - 1]
			if ([...input][i] === ">") {
				robo_visited.push([robo_last_visited[0] + 1, robo_last_visited[1]]);
			} else if ([...input][i] === "<") {
				robo_visited.push([robo_last_visited[0] - 1, robo_last_visited[1]]);
			} else if ([...input][i] === "^") {
				robo_visited.push([robo_last_visited[0], robo_last_visited[1] - 1]);
			} else if ([...input][i] === "v") {
				robo_visited.push([robo_last_visited[0], robo_last_visited[1] + 1]);
			}
		}
	}

	const visited = santa_visited.concat(robo_visited);
	const sorted = visited.sort((a, b) => {
		if (a[0] === b[0]) {
			return a[1] - b[1];
		}
		return b[0] - a[0];
	});
	let houses = 0;
	for (let i = 0; i < sorted.length; i++) {
		let element = sorted[i];
		if (i === 0
			|| element[0] !== sorted[i - 1][0]
			|| element[1] !== sorted[i - 1][1]) {
			houses += 1
		}
	}
	console.log(houses);
}

mane();
