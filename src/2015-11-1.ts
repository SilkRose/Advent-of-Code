import "@total-typescript/ts-reset";

async function mane() {
	let pw = "cqjxjnds";
	let matches = false;
	const pattern = /[iol]/;
	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	while (!matches) {
		pw = increment_pw(pw, alphabet);
		matches = check_pw(pw, pattern, alphabet);
	}
	console.log(pw);
}

function increment_pw(pw: string, alphabet: string): string {
	let new_pw = pw.split("").reverse();
	const alpharray = alphabet.split("");
	for (let c = 0; c < new_pw.length; c++) {
		if (new_pw[c] === "z") {
			new_pw[c] = "a";
		} else if (new_pw[c - 1] === "a") {
			if (new_pw[c] === "z") {
				new_pw[c] = "a";
			} else {
				new_pw[c] = alpharray[alpharray.indexOf(new_pw[c]) + 1];
				break;
			}
		} else {
			new_pw[c] = alpharray[alpharray.indexOf(new_pw[c]) + 1];
			break;
		}
	}
	return new_pw.reverse().join("");
}

function check_pw(pw: string, pattern: RegExp, alphabet: string): boolean {
	if (pattern.test(pw)) return false;
	const double_consecutive =
		pw.match(/(.)\1*/g)!.filter((s) => s.length > 1).length > 1;
	if (!double_consecutive) return false;
	for (let i = 0; i < alphabet.length - 2; i++) {
		if (pw.includes(alphabet.slice(i, i + 3))) return true;
	}
	return false;
}

mane();
