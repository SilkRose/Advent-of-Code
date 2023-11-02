import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 18)).trim().split("\n");
	const map = get_map(input);
	const part_one = run_sim(map);
	console.log("Part 1: " + part_one);
}

function get_map(input: string[]): boolean[][] {
	let map = [];
	for (const line of input) {
		let row = [];
		const chars = line.split("");
		for (const char of chars) {
			if (char === ".") row.push(false);
			if (char === "#") row.push(true);
		}
		map.push(row);
	}
	return map;
}

function run_sim(map: boolean[][]): number {
	for (let i = 0; i <= 100; i++) {
		const old_map = [...map];
		for (let x = 0; x < map.length; x++) {
			for (let y = 0; y < map[x].length; y++) {
				map[x][y] = check_light(old_map, old_map[x][y], x, y);
			}
		}
	}
	return map.flat(1).filter((l) => l).length;
}

function check_light(
	map: boolean[][],
	lite: boolean,
	x: number,
	y: number
): boolean {
	const rows = map.length;
	const cols = map[0].length;

	const neighbors = [
		[-1, -1],
		[0, -1],
		[1, -1],
		[-1, 0],
		[1, 0],
		[-1, 1],
		[0, 1],
		[1, 1],
	];
	let alive = 0;
	for (const [dx, dy] of neighbors) {
		const nx = x + dx;
		const ny = y + dy;
		if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
			alive += map[nx][ny] ? 1 : 0;
		}
	}
	if (lite) {
		return alive === 2 || alive === 3;
	} else {
		return alive === 3;
	}
}

mane();
