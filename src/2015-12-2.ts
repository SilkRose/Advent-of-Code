import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = await get_input(2015, 12);
	const json = JSON.parse(input);
	const sum = sum_without_red(json);
	console.log(sum);
}

function sum_without_red(json: any): number {
	let total = 0;
	obj: if (Object.keys(json).length > 0 && json.constructor === Object) {
		for (let key in json) {
			if (json[key] === "red") break obj;
		}
		for (let key in json) {
			if (Number(json[key])) {
				total += Number(json[key]);
			} else if (typeof json[key] === "object") {
				total += sum_without_red(json[key]);
			} else if (Array.isArray(json[key])) {
				total += sum_without_red(json[key]);
			}
		}
	} else if (Array.isArray(json)) {
		for (let element of json) {
			if (Number(element)) {
				total += Number(element);
			} else if (typeof element === "object") {
				total += sum_without_red(element);
			} else if (Array.isArray(element)) {
				total += sum_without_red(element);
			}
		}
	}
	return total;
}

mane();
