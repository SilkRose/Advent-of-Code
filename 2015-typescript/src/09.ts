import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

type Distances = { [key: string]: { [key: string]: number } };

async function mane() {
	const input = (await get_input(2015, 9)).trim().split("\n");
	const cities = Array.from(
		new Set(
			input
				.flatMap((l) =>
					l
						.replace(" to ", ",")
						.replace(/ = [0-9]+/g, "")
						.split(",")
				)
				.sort()
		)
	);
	const city_distances = get_city_distances(cities, input);
	const distances = get_distances([], cities, city_distances, []).sort(
		(a, b) => a - b
	);
	const part_one = distances[0];
	const part_two = distances[distances.length - 1];
	console.log("Part 1: " + part_one);
	console.log("Part 2: " + part_two);
}

function get_city_distances(cities: string[], input: string[]): Distances {
	let distances: Distances = {};
	for (let city1 of cities) {
		distances[city1] = {};
		for (let city2 of cities) {
			if (!distances[city2]) distances[city2] = {};
			if (city1 === city2) continue;
			if (
				distances[`${city1}`][`${city2}`] &&
				distances[`${city2}`][`${city1}`]
			)
				continue;
			for (let string of input) {
				if (string.includes(city1) && string.includes(city2)) {
					distances[city1][city2] = Number(string.split(" = ")[1]);
					distances[city2][city1] = Number(string.split(" = ")[1]);
					break;
				}
			}
		}
	}
	return distances;
}

function get_distances(
	visited: string[],
	cities: string[],
	map: Distances,
	distances: number[]
): number[] {
	const unvisited = cities.filter((c) => !visited.includes(c));
	if (unvisited.length === 0)
		return distances.concat(calc_distance(visited, map));
	for (let city of unvisited) {
		let local = visited.concat(city);
		distances = Array.from(
			new Set(
				distances.concat(get_distances(local, cities, map, distances))
			)
		);
	}
	return distances;
}

function calc_distance(cities: string[], map: Distances): number {
	let distance = 0;
	for (let c = 0; c < cities.length - 1; c++) {
		distance += map[cities[c]][cities[c + 1]];
	}
	return distance;
}

mane();
