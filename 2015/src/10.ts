import "@total-typescript/ts-reset";

async function mane() {
	const input = "1113122113";
	let segments = [...input.match(/(\d)\1*/g)!];
	let part_one;
	for (let i = 0; i < 50; i++) {
		segments = segments
			.map((s) => s.length + s.slice(0, 1))
			.join("")
			.match(/(\d)\1*/g)!;
		if (i === 39) part_one = segments.join("").length;
	}
	const part_two = segments.join("").length;
	console.log("Part 1: " + part_one);
	console.log("Part 2: " + part_two);
}

mane();
