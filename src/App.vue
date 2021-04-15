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
          @addBag="addBag"
          @countChanged="countChanged"
          :ref="pickupCounter"
        />
      </div>
      <button @click="resetAll">Reset All</button>
    </div>
    <craftable-items :pickupCounts="pickupCounts" :pickupsInBag="craftingBag"/>

    <div></div>
  </div>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent } from "vue";
import PickupRecipeVue from "./components/PickupRecipe.vue";
import PickupCounter from "./components/PickupCounter.vue";
import CraftableItems from "./components/CraftableItems.vue";
import { crafting } from "./crafting";

let c = new crafting();

export default defineComponent({
  name: "App",
  components: {
    PickupRecipeVue,
    PickupCounter,
    CraftableItems,
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
      counterElements: [] as ComponentPublicInstance[],
    };
  },

  created() {
    c.loadItems();
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

    pickupCounter(element: ComponentPublicInstance) {
      if (element) {
        this.counterElements.push(element);
      }
    },

    resetAll() {
      this.counterElements.forEach((n: any) => {
        n.count = 0;
        n.countChanged(0);
      });
    },

    addBag(id: number) {
      if (this.craftingBag.length < 8)
        this.craftingBag = [...this.craftingBag, id];
    },

    craftedItem(recipe: number[]) {
      return c.craftItem(recipe);
    },

    countChanged(id: number, count: number) {
      if (!(id in this.pickupCounts)) {
        this.pickupCounts[id] = 0;
      }
      this.pickupCounts[id] = count;
      //this.recipes = c.getCombinations({ ...this.pickupCounts });
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
