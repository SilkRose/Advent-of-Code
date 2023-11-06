import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

type Reindeer = { [key: string]: { [key: string]: number } };

async function mane() {
	const input = (await get_input(2015, 14)).trim().split("\n");
	const time = 2503;
	const reindeer = get_stats(input);
	const results = fly(reindeer, time);
	let distance = 0;
	let score = 0;
	for (const deer in results) {
		if (results[deer]["score"] >= score) score = results[deer]["score"];
		if (results[deer]["distance"] > distance)
			distance = results[deer]["distance"];
	}
	console.log("Part 1: " + distance);
	console.log("Part 2: " + score);
}

function get_stats(input: string[]): Reindeer {
	let reindeer: Reindeer = {};
	input
		.map((l) =>
			l
				.replace(
					/ can fly | km\/s for | seconds, but then must rest for | seconds./g,
					","
				)
				.split(",")
		)
		.map(
			(r) =>
				(reindeer[r[0]] = {
					speed: Number(r[1]),
					flight_time: Number(r[2]),
					rest_time: Number(r[3]),
				})
		);
	return reindeer;
}

function fly(reindeer: Reindeer, time: number): Reindeer {
	for (const deer in reindeer) {
		reindeer[deer]["score"] = 0;
		reindeer[deer]["flying"] = 1;
		reindeer[deer]["distance"] = 0;
		reindeer[deer]["change_in"] = reindeer[deer]["flight_time"];
	}
	for (let t = 1; t <= time; t++) {
		for (const deer in reindeer) {
			if (reindeer[deer]["flying"] === 1) {
				reindeer[deer]["distance"] += reindeer[deer]["speed"];
				reindeer[deer]["change_in"]--;
			} else {
				reindeer[deer]["change_in"]--;
			}
			if (reindeer[deer]["change_in"] === 0) {
				if (reindeer[deer]["flying"] === 1) {
					reindeer[deer]["change_in"] = reindeer[deer]["rest_time"];
				} else {
					reindeer[deer]["change_in"] = reindeer[deer]["flight_time"];
				}
				reindeer[deer]["flying"] =
					reindeer[deer]["flying"] === 1 ? 0 : 1;
			}
		}
		let highest = 0;
		for (const deer in reindeer) {
			if (reindeer[deer]["distance"] > highest) {
				highest = reindeer[deer]["distance"];
			}
		}
		for (const deer in reindeer) {
			if (reindeer[deer]["distance"] === highest) {
				reindeer[deer]["score"]++;
			}
		}
	}
	return reindeer;
}

mane();
