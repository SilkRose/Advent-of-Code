import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 18)).trim().split("\n");
	const map1 = get_map(input);
	const map2 = map1.map((m) => [...m]);
	const part_one = run_sim(map1, false);
	const part_two = run_sim(map2, true);
	console.log("Part 1: " + part_one);
	console.log("Part 2: " + part_two);
}

function get_map(input: string[]): boolean[][] {
	let map = [];
	for (let x = 0; x < input[0].length; x++) {
		let column = [];
		const chars = input[x].split("");
		for (let y = 0; y < chars.length; y++) {
			if (chars[y] === ".") column.push(false);
			if (chars[y] === "#") column.push(true);
		}
		map.push(column);
	}
	return map;
}

function run_sim(map: boolean[][], stuck_corners: boolean): number {
	for (let i = 0; i < 100; i++) {
		if (stuck_corners) map = stick_corners(map);
		const old_map = map.map((m) => [...m]);
		for (let x = 0; x < map.length; x++) {
			for (let y = 0; y < map[x].length; y++) {
				map[x][y] = check_light(old_map, old_map[x][y], x, y);
			}
		}
	}
	if (stuck_corners) map = stick_corners(map);
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

function stick_corners(map: boolean[][]): boolean[][] {
	map[0][0] = true;
	map[map.length - 1][0] = true;
	map[0][map[0].length - 1] = true;
	map[map.length - 1][map[0].length - 1] = true;
	return map;
}

mane();
