import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = await get_input(2015, 12);
	const json = JSON.parse(input);
	const part_one = sum_without_red(json);
	const part_two = sum_without_red(json, true);
	console.log("Part 1: " + part_one);
	console.log("Part 2: " + part_two);
}

function sum_without_red(json: any, no_red?: boolean): number {
	let total = 0;
	obj: if (Object.keys(json).length > 0 && json.constructor === Object) {
		if (no_red) {
			for (let key in json) {
				if (json[key] === "red") break obj;
			}
		}
		for (let key in json) {
			if (Number(json[key])) {
				total += Number(json[key]);
			} else if (typeof json[key] === "object") {
				total += sum_without_red(json[key], no_red);
			} else if (Array.isArray(json[key])) {
				total += sum_without_red(json[key], no_red);
			}
		}
	} else if (Array.isArray(json)) {
		for (let element of json) {
			if (Number(element)) {
				total += Number(element);
			} else if (typeof element === "object") {
				total += sum_without_red(element, no_red);
			} else if (Array.isArray(element)) {
				total += sum_without_red(element, no_red);
			}
		}
	}
	return total;
}

mane();
