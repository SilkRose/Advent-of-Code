import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

type Aunts = { [key: string]: { [key: string]: number } };

const target: { [key: string]: number } = {
	children: 3,
	cats: 7,
	samoyeds: 2,
	pomeranians: 3,
	akitas: 0,
	vizslas: 0,
	goldfish: 5,
	trees: 3,
	cars: 2,
	perfumes: 1,
};

async function mane() {
	const input = (await get_input(2015, 16)).trim().split("\n");
	const aunts = get_aunts(input);
	let match = find_aunt(aunts);
	console.log(aunts, match);
}

function get_aunts(input: string[]): Aunts {
	let aunts: Aunts = {};
	for (const string of input) {
		const properties = string.replace(/Sue [0-9]*: /, "").split(", ");
		let a = string.split(/Sue |: /)[1];
		aunts[a] = {};
		for (const property of properties) {
			const [key, value] = property.split(/: /);
			aunts[a][key] = Number(value);
		}
	}
	return aunts;
}

function find_aunt(aunts: Aunts): string {
	let match = "";
	loop :for (const aunt in aunts) {
		for (const property in aunts[aunt]) {
			if (aunts[aunt][property] !== target[property]) break;
				match = aunt;
				break loop;
		}
	}
	return match;
}

mane();
