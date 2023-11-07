import "@total-typescript/ts-reset";
import { get_input } from "./lib.js";
import { json } from "stream/consumers";

type Shop = { [key: string]: { [key: string]: { [key: string]: number } } };

type Entity = {
	Hit_Points: number;
	Damage: number;
	Armor: number;
};

const input1 = `Weapons:    Cost  Damage  Armor
Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0

Armor:      Cost  Damage  Armor
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5

Rings:      Cost  Damage  Armor
Damage +1    25     1       0
Damage +2    50     2       0
Damage +3   100     3       0
Defense +1   20     0       1
Defense +2   40     0       2
Defense +3   80     0       3`;

async function mane() {
	const input2 = (await get_input(2015, 21))
		.trim()
		.split("\n")
		.map((l) => l.split(": ")[1]);
	const boss = {
		Hit_Points: Number(input2[0]),
		Damage: Number(input2[1]),
		Armor: Number(input2[2]),
	};
	const player = {
		Hit_Points: 100,
		Damage: 0,
		Armor: 0,
	};
	const shop: Shop = get_shop(input1);
	const winning_costs = run_fights(shop, player, boss);
	const part_one = winning_costs.sort((a, b) => a - b)[0];
	console.log("Part 1: " + part_one);
}

function get_shop(shop_input: string): Shop {
	let shop: Shop = {};
	shop_input.split("\n\n").forEach((c) => {
		const lines = c.split("\n");
		const cat_name = lines[0].split(":")[0];
		shop[cat_name] = {};
		for (let i = 1; i < lines.length; i++) {
			const item = lines[i].replace(" +", "").split(/  */g);
			shop[cat_name][item[0]] = {
				Cost: Number(item[1]),
				Damage: Number(item[2]),
				Armor: Number(item[3]),
			};
		}
	});
	const none = {
		Cost: 0,
		Damage: 0,
		Armor: 0,
	};
	shop["Armor"]["None"] = none;
	shop["Rings"]["None1"] = none;
	shop["Rings"]["None2"] = none;
	return shop;
}

function run_fights(shop: Shop, player: Entity, boss: Entity): number[] {
	let wining_costs: number[] = [];
	for (let weapon in shop["Weapons"]) {
		for (let armor in shop["Armor"]) {
			for (let ring1 in shop["Rings"]) {
				for (let ring2 in shop["Rings"]) {
					if (ring1 === ring2) continue;
					const cost =
						shop["Weapons"][weapon]["Cost"] +
						shop["Armor"][armor]["Cost"] +
						shop["Rings"][ring1]["Cost"] +
						shop["Rings"][ring2]["Cost"];
					const local_player: any = JSON.parse(JSON.stringify(player));
					const local_boss: any = JSON.parse(JSON.stringify(boss));
					local_player["Damage"] =
						shop["Weapons"][weapon]["Damage"] +
						shop["Rings"][ring1]["Damage"] +
						shop["Rings"][ring2]["Damage"];
					local_player["Armor"] =
						shop["Armor"][armor]["Armor"] +
						shop["Rings"][ring1]["Armor"] +
						shop["Rings"][ring2]["Armor"];
					if (sim_fight(local_player, local_boss)) {
						wining_costs.push(cost);
					}
				}
			}
		}
	}
	return wining_costs;
}

function sim_fight(player: Entity, boss: Entity): boolean {
	while (boss.Hit_Points > 0 && player.Hit_Points > 0) {
		boss.Hit_Points -= Math.max(1, player.Damage - boss.Armor);
		player.Hit_Points -= Math.max(1, boss.Damage - player.Armor);
	}
	return boss.Hit_Points <= 0;
}

mane();
