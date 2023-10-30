import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

type signal = { [key: string]: number };

async function mane() {
	const input = (await get_input(2015, 7)).trim().split("\n");
	let signals: signal = {};
	let a = get_signal(input, signals, "a");
	signals = {};
	signals["b"] = a;
	console.log(get_signal(input, signals, "a"));
}

function get_signal(input: string[], signals: signal, signal: string): number {
	const string = input.filter((l) => l.endsWith(` ${signal}`))[0];
	if (signals[`${signal}`]) return signals[`${signal}`];
	return perform_operation(input, string, signals);
}

function perform_operation(
	input: string[],
	string: string,
	signals: signal
): number {
	if (string.includes("AND")) {
		var [value1, value2, dest] = string.split(/ AND | -> /);
		let operands = get_numbers(input, signals, [value1, value2]);
		var result = operands[0] & operands[1];
	} else if (string.includes("OR")) {
		var [value1, value2, dest] = string.split(/ OR | -> /);
		let operands = get_numbers(input, signals, [value1, value2]);
		var result = operands[0] | operands[1];
	} else if (string.includes("NOT")) {
		var [value, dest] = string.replace("NOT ", "").split(/ -> /);
		var result = ~get_signal(input, signals, value);
	} else if (string.includes("LSHIFT")) {
		var [value1, value2, dest] = string.split(/ LSHIFT | -> /);
		let operands = get_numbers(input, signals, [value1, value2]);
		var result = operands[0] << operands[1];
	} else if (string.includes("RSHIFT")) {
		var [value1, value2, dest] = string.split(/ RSHIFT | -> /);
		let operands = get_numbers(input, signals, [value1, value2]);
		var result = operands[0] >> operands[1];
	} else {
		var [value, dest] = string.split(" -> ");
		if (/^\d+$/.test(value)) {
			var result = Number(value);
		} else {
			var result = get_signal(input, signals, value);
		}
	}
	signals[`${dest}`] = result;
	return result;
}

function get_numbers(
	input: string[],
	signals: signal,
	numbers: string[]
): number[] {
	if (/^\d+$/.test(numbers[0]) && !/^\d+$/.test(numbers[1])) {
		return [Number(numbers[0]), get_signal(input, signals, numbers[1])];
	} else if (!/^\d+$/.test(numbers[0]) && /^\d+$/.test(numbers[1])) {
		return [get_signal(input, signals, numbers[0]), Number(numbers[1])];
	} else if (/^\d+$/.test(numbers[0]) && /^\d+$/.test(numbers[1])) {
		return [Number(numbers[0]), Number(numbers[1])];
	} else {
		return [
			get_signal(input, signals, numbers[0]),
			get_signal(input, signals, numbers[1]),
		];
	}
}

mane();
