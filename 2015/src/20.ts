import "@total-typescript/ts-reset";

async function mane() {
	const input = 36000000;
	const part_one = find_house(input);
	console.log("Part 1: " + part_one);
}

function find_house(presents: number): number {
	const max = presents / 10;
	for (let i = 1; i <= max; i++) {
		let house = 0;
		for (let p = 1; p <= i; p++) {
			if (i % p === 0) house += p * 10;
		}
		if (presents <= house) return i;
	}
	return max;
}

mane();
