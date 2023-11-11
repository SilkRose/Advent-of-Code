import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 3)).trim().split("");
	let visited = [[0, 0]];
	let santa_visited = [[0, 0]];
	let robo_visited = [[0, 0]];
	for (let i = 0; i < input.length; i++) {
		visited = visit(input, i, visited);
		if (i % 2 === 0) {
			santa_visited = visit(input, i, santa_visited);
		} else {
			robo_visited = visit(input, i, robo_visited);
		}
	}

	console.log("Part 1: " + get_houses(visited));
	console.log("Part 1: " + get_houses(santa_visited.concat(robo_visited)));
}

function visit(input: string[], i: number, visited: number[][]): number[][] {
	const last_visited = visited[visited.length - 1];
	if (input[i] === ">") {
		visited.push([last_visited[0] + 1, last_visited[1]]);
	} else if (input[i] === "<") {
		visited.push([last_visited[0] - 1, last_visited[1]]);
	} else if (input[i] === "^") {
		visited.push([last_visited[0], last_visited[1] - 1]);
	} else if (input[i] === "v") {
		visited.push([last_visited[0], last_visited[1] + 1]);
	}
	return visited;
}

function get_houses(visited: number[][]): number {
	const sorted = visited.sort((a, b) => {
		if (a[0] === b[0]) {
			return a[1] - b[1];
		}
		return b[0] - a[0];
	});
	let houses = 0;
	for (let i = 0; i < sorted.length; i++) {
		let element = sorted[i];
		if (
			i === 0 ||
			element[0] !== sorted[i - 1][0] ||
			element[1] !== sorted[i - 1][1]
		) {
			houses += 1;
		}
	}
	return houses;
}

mane();
