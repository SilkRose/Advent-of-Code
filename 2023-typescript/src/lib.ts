import "@total-typescript/ts-reset";
import * as fs from "fs";
import fetch from "node-fetch";
import * as path from "path";
import { exit } from "process";

export async function get_input(pony: string, year: number, day: number): Promise<string> {
	const cookie_path = path.resolve(`../cookie_${pony}`);
	const input_path = path.resolve(`./input/${year}-${day}-${pony}.txt`);
	if (fs.existsSync(input_path)) {
		return fs.readFileSync(input_path).toString();
	}
	mkdir("./input/");
	const cookie = fs.readFileSync(cookie_path, "utf8").trim();
	const opts = {
		headers: {
			Cookie: `session=${cookie}`,
		},
	};
	const result = await fetch(
		`https://adventofcode.com/${year}/day/${day}/input`,
		opts
	);
	if (result.ok) {
		fs.writeFileSync(input_path, await result.text());
		return fs.readFileSync(input_path).toString();
	} else {
		console.error(`Failed to fetch input. Status code: ${result.status}`);
		exit(1);
	}
}

export function mkdir(dir: string) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(path.resolve(dir));
	}
}
