import "@total-typescript/ts-reset";

async function mane() {
	const input = "1113122113";
	let segments = [...input.match(/(\d)\1*/g)!];
	for (let i = 0; i < 50; i++) {
		segments = segments
			.map((s) => s.length + s.slice(0, 1))
			.join("")
			.match(/(\d)\1*/g)!;
	}
	console.log(segments.join("").length);
}

mane();
