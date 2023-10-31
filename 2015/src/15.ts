import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

type Ingredients = { [key: string]: { [key: string]: number } };

async function mane() {
	const input = (await get_input(2015, 15)).trim().split("\n");
	const ingredients = get_stats(input);
	const scores = get_scores(ingredients);
	let part_one = scores.sort((a, b) => b - a)[0];
	console.log("Part 1: " + part_one);
}

function get_stats(input: string[]): Ingredients {
	let ingredients: Ingredients = {};
	input
		.map((l) =>
			l
				.replace(
					/: capacity |, durability |, flavor |, texture |, calories /g,
					","
				)
				.split(",")
		)
		.map(
			(i) =>
				(ingredients[i[0]] = {
					capacity: Number(i[1]),
					durability: Number(i[2]),
					flavor: Number(i[3]),
					texture: Number(i[4]),
					calories: Number(i[5]),
				})
		);
	return ingredients;
}

function get_scores(ingredients: Ingredients): number[] {
	const scores = [];
	for (let s = 0; s <= 100; s++) {
		for (let b = 0; b <= 100 - s; b++) {
			for (let c = 0; c <= 100 - s - b; c++) {
				const a = 100 - s - b - c;
				scores.push(calc_score(ingredients, [s, b, c, a]));
			}
		}
	}
	return scores;
}

function calc_score(ingredients: Ingredients, amounts: number[]): number {
	let score = 0;
	let i = 0;
	let capacity = [];
	let durability = [];
	let flavor = [];
	let texture = [];
	for (const ingredient in ingredients) {
		capacity.push(amounts[i] * ingredients[ingredient]["capacity"]);
		durability.push(amounts[i] * ingredients[ingredient]["durability"]);
		flavor.push(amounts[i] * ingredients[ingredient]["flavor"]);
		texture.push(amounts[i] * ingredients[ingredient]["texture"]);
		i++;
	}
	score =
		Math.max(
			0,
			capacity.reduce((a, b) => a + b)
		) *
		Math.max(
			0,
			durability.reduce((a, b) => a + b)
		) *
		Math.max(
			0,
			flavor.reduce((a, b) => a + b)
		) *
		Math.max(
			0,
			texture.reduce((a, b) => a + b)
		);
	return score;
}

mane();
