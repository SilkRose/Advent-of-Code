import "@total-typescript/ts-reset";
import { Md5 } from 'ts-md5';

async function mane() {
	const input = "ckczppom";
	let i = 0;
	let hash: string = "";
	while (hash.substring(0, 6) !== "000000") {
		hash = Md5.hashStr(input + i);
		i++;
	}
	console.log(i - 1);
}

mane();
