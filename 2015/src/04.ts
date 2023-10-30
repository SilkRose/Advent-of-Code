import "@total-typescript/ts-reset";
import { Md5 } from "ts-md5";

async function mane() {
	const input = "ckczppom";
	let i = 0;
	let hash: string = "";
	let part1: number;
	while (hash.substring(0, 6) !== "000000") {
		if (part1! === undefined && hash.startsWith("00000")) part1 = i - 1;
		hash = Md5.hashStr(input + i);
		i++;
	}
	let part2 = i - 1;
	console.log("Part 1: " + part1!);
	console.log("Part 2: " + part2);
}

mane();
