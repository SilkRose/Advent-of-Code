import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

async function mane() {
	const input = (await get_input(2015, 12)).trim();
	const sum = input
		.replace(/[a-zA-Z{}\[\]":]/g, "")
		.replace(/,+/g, ",")
		.split(",")
		.slice(1)
		.map((n) => Number(n))
		.reduce((a, b) => a + b, 0);
	console.log(sum);
}

mane();
