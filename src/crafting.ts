const pickupIdxList = [1, 2, 3, 4, 5]

export class crafting {

    private recurseCombinations(availablePickups: {[n: number]: number}, currentRecipe: number[], counter: number, foundRecipes: number[][]): void {
        if (currentRecipe.length == 8) {
            foundRecipes.push([...currentRecipe])
        }

        for (let i = counter; i < pickupIdxList.length; ++i) {
            const pickupId = pickupIdxList[i];
            if (pickupId in availablePickups && availablePickups[pickupId] > 0) {
                availablePickups[pickupId] -= 1;
                this.recurseCombinations(availablePickups, [...currentRecipe, pickupId], i, foundRecipes);
                availablePickups[pickupId] += 1;
            }
        }

    }

    getCombinations(availablePickups: {[n: number]: number}): number[][] {
        const foundRecipes: number[][] = [];
        this.recurseCombinations(availablePickups, [], 0, foundRecipes);
        return foundRecipes;
    }
}