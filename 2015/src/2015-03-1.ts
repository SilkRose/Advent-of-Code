import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 3)).trim();
	let visited = [[0, 0]];
	for (let move of [...input]) {
		const last_visited = visited[visited.length - 1]
		if (move === ">") {
			visited.push([last_visited[0] + 1, last_visited[1]]);
		} else if (move === "<") {
			visited.push([last_visited[0] - 1, last_visited[1]]);
		} else if (move === "^") {
			visited.push([last_visited[0], last_visited[1] - 1]);
		} else if (move === "v") {
			visited.push([last_visited[0], last_visited[1] + 1]);
		}
	}
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
