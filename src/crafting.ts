import * as d3 from "d3";
import { sort } from "d3";

const pickupIdxList = [8, 1, 12, 15, 2, 9, 21, 22, 7, 3, 4, 5, 6, 18, 10, 11, 13, 14, 16, 19, 23, 20, 24, 25, 17]
interface ItemPoolEntry {
  id: number;
  weight: number;
  quality: number;
}

const pickupShifts = [
  [0x00000001, 0x00000005, 0x00000010],
  [0x00000001, 0x00000005, 0x00000013],
  [0x00000001, 0x00000009, 0x0000001d],
  [0x00000001, 0x0000000b, 0x00000006],
  [0x00000001, 0x0000000b, 0x00000010],
  [0x00000001, 0x00000013, 0x00000003],
  [0x00000001, 0x00000015, 0x00000014],
  [0x00000001, 0x0000001b, 0x0000001b],
  [0x00000002, 0x00000005, 0x0000000f],
  [0x00000002, 0x00000005, 0x00000015],
  [0x00000002, 0x00000007, 0x00000007],
  [0x00000002, 0x00000007, 0x00000009],
  [0x00000002, 0x00000007, 0x00000019],
  [0x00000002, 0x00000009, 0x0000000f],
  [0x00000002, 0x0000000f, 0x00000011],
  [0x00000002, 0x0000000f, 0x00000019],
  [0x00000002, 0x00000015, 0x00000009],
  [0x00000003, 0x00000001, 0x0000000e],
  [0x00000003, 0x00000003, 0x0000001a],
  [0x00000003, 0x00000003, 0x0000001c],
  [0x00000003, 0x00000003, 0x0000001d],
  [0x00000003, 0x00000005, 0x00000014],
  [0x00000003, 0x00000005, 0x00000016],
  [0x00000003, 0x00000005, 0x00000019],
  [0x00000003, 0x00000007, 0x0000001d],
  [0x00000003, 0x0000000d, 0x00000007],
  [0x00000003, 0x00000017, 0x00000019],
  [0x00000003, 0x00000019, 0x00000018],
  [0x00000003, 0x0000001b, 0x0000000b],
  [0x00000004, 0x00000003, 0x00000011],
  [0x00000004, 0x00000003, 0x0000001b],
  [0x00000004, 0x00000005, 0x0000000f],
  [0x00000005, 0x00000003, 0x00000015],
  [0x00000005, 0x00000007, 0x00000016],
  [0x00000005, 0x00000009, 0x00000007],
  [0x00000005, 0x00000009, 0x0000001c],
  [0x00000005, 0x00000009, 0x0000001f],
  [0x00000005, 0x0000000d, 0x00000006],
  [0x00000005, 0x0000000f, 0x00000011],
  [0x00000005, 0x00000011, 0x0000000d],
  [0x00000005, 0x00000015, 0x0000000c],
  [0x00000005, 0x0000001b, 0x00000008],
  [0x00000005, 0x0000001b, 0x00000015],
  [0x00000005, 0x0000001b, 0x00000019],
  [0x00000005, 0x0000001b, 0x0000001c],
  [0x00000006, 0x00000001, 0x0000000b],
  [0x00000006, 0x00000003, 0x00000011],
  [0x00000006, 0x00000011, 0x00000009],
  [0x00000006, 0x00000015, 0x00000007],
  [0x00000006, 0x00000015, 0x0000000d],
  [0x00000007, 0x00000001, 0x00000009],
  [0x00000007, 0x00000001, 0x00000012],
  [0x00000007, 0x00000001, 0x00000019],
  [0x00000007, 0x0000000d, 0x00000019],
  [0x00000007, 0x00000011, 0x00000015],
  [0x00000007, 0x00000019, 0x0000000c],
  [0x00000007, 0x00000019, 0x00000014],
  [0x00000008, 0x00000007, 0x00000017],
  [0x00000008, 0x00000009, 0x00000017],
  [0x00000009, 0x00000005, 0x0000000e],
  [0x00000009, 0x00000005, 0x00000019],
  [0x00000009, 0x0000000b, 0x00000013],
  [0x00000009, 0x00000015, 0x00000010],
  [0x0000000a, 0x00000009, 0x00000015],
  [0x0000000a, 0x00000009, 0x00000019],
  [0x0000000b, 0x00000007, 0x0000000c],
  [0x0000000b, 0x00000007, 0x00000010],
  [0x0000000b, 0x00000011, 0x0000000d],
  [0x0000000b, 0x00000015, 0x0000000d],
  [0x0000000c, 0x00000009, 0x00000017],
  [0x0000000d, 0x00000003, 0x00000011],
  [0x0000000d, 0x00000003, 0x0000001b],
  [0x0000000d, 0x00000005, 0x00000013],
  [0x0000000d, 0x00000011, 0x0000000f],
  [0x0000000e, 0x00000001, 0x0000000f],
  [0x0000000e, 0x0000000d, 0x0000000f],
  [0x0000000f, 0x00000001, 0x0000001d],
  [0x00000011, 0x0000000f, 0x00000014],
  [0x00000011, 0x0000000f, 0x00000017],
  [0x00000011, 0x0000000f, 0x0000001a],
];

const pickupValues = [
  0x00000000, // 0 None

  // Hearts
  0x00000001, // 1 Red heart
  0x00000004, // 2 Soul Heart
  0x00000005, // 3 Black Heart
  0x00000005, // 4 Eternal Heart
  0x00000005, // 5 Gold Heart
  0x00000005, // 6 Bone Heart
  0x00000001, // 7 Rotten Heart

  // Pennies
  0x00000001, // 8 Penny
  0x00000003, // 9 Nickel
  0x00000005, // 10 Dime
  0x00000008, // 11 Lucky Penny

  // Keys
  0x00000002, // 12 Key
  0x00000005, // 13 Golden Key
  0x00000005, // 14 Charged Key

  // Bombs
  0x00000002, // 15 Bomb
  0x00000006, // 16 Golden Bomb
  0x0000000a, // 17 Giga Bomb

  // Batteries
  0x00000002, // 18 Micro Battery
  0x00000004, // 19 Lil' Battery
  0x00000008, // 20 Mega Battery

  // Usables
  0x00000002, // 21 Card
  0x00000002, // 22 Pill
  0x00000004, // 23 Rune
  0x00000004, // 24 Dice Shard
  0x00000002, // 25 Cracked Key
  0x00000001,
];

const qualityBoundsList: [number, [number, number]][] = [
  [34, [4, 4]],
  [30, [3, 4]],
  [26, [2, 4]],
  [22, [1, 4]],
  [18, [1, 3]],
  [14, [1, 2]],
  [8, [0, 2]],
  [0, [0, 1]],
];

function rngShift(seed: number, shifts: number[]): number {
  seed ^= (seed >>> shifts[0]) & 0xffffffff;
  seed ^= (seed << shifts[1]) & 0xffffffff;
  seed ^= (seed >>> shifts[2]) & 0xffffffff;
  seed >>>= 0;
  return seed;
}

export class crafting {
  itemPools: ItemPoolEntry[][] = [];

  async loadItems() {
    const qualityMap: { [id: number]: number } = {};

    const xmlItemMetadata = await d3.xml("./items_metadata.xml");
    for (const item of xmlItemMetadata.querySelectorAll("item")) {
      const id = Number(item.getAttribute("id"));
      const quality = Number(item.getAttribute("quality"));
      if (id && quality) {
        qualityMap[id] = quality;
      }
    }

    const xmlPools = await d3.xml("./itempools.xml");
    for (const xmlPool of xmlPools.querySelectorAll("Pool")) {
      const pool: ItemPoolEntry[] = [];
      for (const item of xmlPool.querySelectorAll("Item")) {
        const id = Number(item.getAttribute("Id"));
        pool.push({
          id,
          weight: Number(item.getAttribute("Weight")),
          quality: qualityMap[id] ?? 0,
        });
      }
      this.itemPools.push(pool);
    }
  }

  private recurseCombinations(
    availablePickups: { [n: number]: number },
    currentRecipe: number[],
    counter: number,
    foundRecipes: number[][]
  ): void {
    if (currentRecipe.length == 8) {
      foundRecipes.push([...currentRecipe]);
    }

    for (let i = counter; i < pickupIdxList.length; ++i) {
      const pickupId = pickupIdxList[i];
      if (pickupId in availablePickups && availablePickups[pickupId] > 0) {
        availablePickups[pickupId] -= 1;
        this.recurseCombinations(
          availablePickups,
          [...currentRecipe, pickupId],
          i,
          foundRecipes
        );
        availablePickups[pickupId] += 1;
      }
    }
  }

  getCombinations(availablePickups: { [n: number]: number }, startingPickups:number[]): number[][] {
    const foundRecipes: number[][] = [];
    this.recurseCombinations(availablePickups, startingPickups, 0, foundRecipes);
    return foundRecipes;
  }

  private getPoolWeights(recipe: number[]): [id: number, weight: number][] {
    const pickupCounts: { [n: number]: number } = {};

    for (const pickupId of recipe) {
      pickupCounts[pickupId] = (pickupCounts[pickupId] ?? 0) + 1;
    }

    const poolWeights:[number, number][] = [
      [0, 1],
      [1, 2],
      [2, 2],
      [3, (pickupCounts[3] ?? 0) * 10],
      [4, (pickupCounts[4] ?? 0) * 10],
      [5, (pickupCounts[6] ?? 0) * 10],
      [8, (pickupCounts[5] ?? 0) * 10],
      [9, (pickupCounts[25] ?? 0) * 10],
      [12, (pickupCounts[7] ?? 0) * 10],
    ];

    let combined = 0;
    for (const i of [1, 8, 12, 15]) {
      combined += pickupCounts[i] ?? 0;
    }
    if (combined == 0) {
      poolWeights.push([26, (pickupCounts[23] ?? 0) * 10]);
    }

    return poolWeights;
  }

  private getQualityBounds(recipe: number[], itemPoolIdx: number): [number, number] {
    let totalValue = 0;
    for (const pickupId of recipe) {
      totalValue += pickupValues[pickupId];
    }

    if (itemPoolIdx >= 3 && itemPoolIdx <= 5) {
      totalValue -= 5;
    }

    for (const qualityBounds of qualityBoundsList) {
      if (totalValue > qualityBounds[0]) {
        return qualityBounds[1];
      }
    }
    return [0, 0];
  }

  craftItem(recipe: number[]): number {
    if (recipe.length != 8) {
      return 0;
    }

    const sortedRecipe = [...recipe].sort((a, b)=>a-b);

    let seed = 0x77777770;
    for (const pickupId of sortedRecipe) {
      seed = rngShift(seed, pickupShifts[pickupId]);
    }

    const poolWeights = this.getPoolWeights(recipe);
    const itemWeights: {[id: number]: number} = {};
    let totalWeight = 0;

    for (const poolWeight of poolWeights) {
      const itemPool = this.itemPools[poolWeight[0]]
      const qualityBounds = this.getQualityBounds(recipe, poolWeight[0]);
      for (const item of itemPool) {
        if (item.quality < qualityBounds[0] || item.quality > qualityBounds[1])
          continue;
        itemWeights[item.id] = (itemWeights[item.id] ?? 0) + item.weight * poolWeight[1];
        totalWeight += item.weight * poolWeight[1];
      }
    }

    seed = rngShift(seed, [1, 21, 20]);
    const seedMultiplier = 2.3283061589829401e-10;

    let target = seed * seedMultiplier * totalWeight;

    for (const id in itemWeights) {
      const weight = itemWeights[id];
      target -= weight
      if (target < 0) {
        return +id;
      }
    }
    return 25;
  }
}
