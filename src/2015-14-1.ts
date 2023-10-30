import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";

type Reindeer = { [key: string]: { [key: string]: number } };

async function mane() {
	const input = (await get_input(2015, 14)).trim().split("\n");
	const time = 2503;
	let reindeer = get_stats(input);
	reindeer = get_distances(reindeer, time);
	let highest = 0;
	for (const deer in reindeer) {
		if (reindeer[deer]["distance"] > highest)
			highest = reindeer[deer]["distance"];
	}
	console.log(highest);
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

function get_distances(reindeer: Reindeer, time: number): Reindeer {
	for (const deer in reindeer) {
		let distance = 0;
		const deer_time =
			reindeer[deer]["flight_time"] + reindeer[deer]["rest_time"];
		const remainder = time % deer_time;
		const amount = Math.floor(time / deer_time);
		const distance_per =
			reindeer[deer]["speed"] * reindeer[deer]["flight_time"];
		distance = amount * distance_per;
		distance +=
			Math.min(remainder, reindeer[deer]["flight_time"]) *
			reindeer[deer]["speed"];
		reindeer[deer]["distance"] = distance;
	}
	return reindeer;
}

mane();
