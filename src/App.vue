<template>
  <div style="display: flex">
    <div>
      <div style="display: flex">
        <pickup-recipe-vue v-bind:idList="craftingBag" />
        <button @click="resetBag">Reset</button>
      </div>
      <div
        v-for="line in pickupCounters"
        :key="line"
        style="display: flex; padding-top: 20px"
      >
        <pickup-counter
          v-for="n in line"
          :key="n"
          :idx="n"
          v-model:count="pickupCounts[n]"
          @addBag="addBag"
        />
      </div>
      <button @click="resetAll">Reset All</button>
    </div>
    <craftable-items
      :pickupCounts="pickupCounts"
      :pickupsInBag="craftingBag"
      @recipeClicked="recipeClicked"
    />

    <craft-history
      :recipeHistory="recipeHistory"
      @undo="undo"
      @clear="clearHistory"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PickupRecipeVue from "./components/PickupRecipe.vue";
import PickupCounter from "./components/PickupCounter.vue";
import CraftableItems from "./components/CraftableItems.vue";
import { RecipeEntry } from "./components/CraftHistory.vue";
import CraftHistory from "./components/CraftHistory.vue";
import * as items from "./items";
import * as crafting from "./crafting";

export default defineComponent({
  name: "App",
  components: {
    PickupRecipeVue,
    PickupCounter,
    CraftableItems,
    CraftHistory,
  },

  data() {
    return {
      craftingBag: [] as number[],
      pickupCounts: {} as { [n: number]: number },
      recipes: [] as number[][],
      pickupCounters: [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14],
        [15, 16, 17],
        [18, 19, 20],
        [21, 22, 23, 24, 25],
      ],
      recipeHistory: [] as RecipeEntry[],
    };
  },

  created() {
    (async () => {
      await items.loadItems();
      await crafting.loadPools();
    })().catch((e) => {
      console.log(e);
    });
  },

  methods: {
    addHeart() {
      this.craftingBag = [...this.craftingBag, 1];
    },

    addPenny() {
      this.craftingBag = [...this.craftingBag, 8];
    },

    resetBag() {
      this.craftingBag = [];
    },

    resetAll() {
      for (let id in this.pickupCounts) {
        this.pickupCounts[id] = 0;
      }
    },

    addBag(id: number) {
      if (this.craftingBag.length < 8)
        this.craftingBag = [...this.craftingBag, id];
    },

    craftedItem(recipe: number[]) {
      return crafting.craftItem(recipe);
    },

    recipeClicked(recipe: number[], item: number) {
      this.recipeHistory.push({ recipe, craftBag: this.craftingBag, item });
      const pickupsToRemove = recipe.slice(this.craftingBag.length);
      for (const pickup of pickupsToRemove) {
        this.pickupCounts[pickup] -= 1;
      }
      this.craftingBag = [];
    },

    undo() {
      const recipeEntry = this.recipeHistory.pop();
      if (recipeEntry) {
        recipeEntry.craftBag.forEach((n) => this.addBag(n));
        const pickupsToAdd = recipeEntry.recipe.slice(
          recipeEntry.craftBag.length
        );
        pickupsToAdd.forEach((n) => (this.pickupCounts[n] += 1));
      }
    },

    clearHistory() {
      this.recipeHistory = [];
    },
  },
});
</script>

<style>
body {
  background: lightgray;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
