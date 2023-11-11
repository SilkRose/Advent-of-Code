import "@total-typescript/ts-reset";

async function mane() {
	const input = 36000000;
	const part_one = find_house(input);
	const part_two = find_house_50(input);
	console.log("Part 1: " + part_one);
	console.log("Part 2: " + part_two);
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

function find_house_50(presents: number): number {
	const max = presents / 11;
	const floor = Math.floor(presents / 50);
	for (let i = floor; i <= max; i++) {
		let house = 0;
		const min = Math.floor(i / 50);
		for (let p = min; p <= i; p++) {
			if (i % p === 0) house += p * 11;
		}
		if (presents <= house) return i;
	}
	return max;
}

mane();
