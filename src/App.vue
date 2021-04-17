<template>
  <div style="display: flex; flex: 1">
    <div class="sidePanel">
      Crafting Bag
      <div style="font-size: 70%">
        Pickups that will have to be used.
      </div>
      <div style="display: flex; padding-top:10px; padding-bottom:5px">
        <img
          :src="`./collectibles/collectibles_710_bagofcrafting.png`"
          style="image-rendering: crisp-edges"
          height="64"
          width="64"
        />
        <pickup-recipe-vue v-bind:idList="craftingBag" />
        <button @click="resetBag">Reset</button>
      </div>
      <div style="font-size: 70%; padding-bottom: 10px">
        Click on a pickup to add it to the bag.
      </div>
      <div class="pickupCountersPanel">
        Available Pickups
        <div style="font-size: 70%">
          On the floor, or in your bag and replaceable
        </div>
        <div
          v-for="line in pickupCounters"
          :key="line"
          style="display: flex; padding-top: 10px;"
        >
          <pickup-counter
            v-for="n in line"
            :key="n"
            :idx="n"
            v-model:count="pickupCounts[n]"
            @addBag="addBag"
          />
        </div>
        <button @click="resetPickups">Clear Pickups</button>
        <button @click="clearHistory">Clear History</button>
      </div>

      <div class="filterPanel">
        Search
        <input v-model="searchFilter" />
      </div>
    </div>
    <craftable-items
      :pickupCounts="pickupCounts"
      :pickupsInBag="craftingBag"
      :filter="searchFilter"
      @recipeClicked="recipeClicked"
      v-model:selectedItem="selectedItem"
    />

    <craft-history
      :recipeHistory="recipeHistory"
      @undo="undo"
      @clear="clearHistory"
    />
  </div>
</template>

<style>
.sidePanel {
  border: solid 5px gray;
  border-right: 0;
}
.screen {
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}
.pickupCountersPanel {
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  border-top: 5px solid gray;
}

.filterPanel {
  border-top: 5px solid gray;
  padding-top: 10px;
}

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
      selectedItem: 0,
      searchFilter: "",
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

    resetPickups() {
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
        this.selectedItem = recipeEntry.item;
      }
    },

    clearHistory() {
      this.recipeHistory = [];
    },
  },
});
</script>
