<template>
  <div style="display: flex">
    <div>
      <div style="display: flex">
        <pickup-recipe-vue v-bind:idList="craftingBag" />
        <button @click="resetBag">   Reset   </button>
      </div>
      <pickup-counter v-for="n in [1, 2, 3, 4, 5]" :key="n" :idx="n" @addBag="addBag" @countChanged="countChanged"/>
    </div>
      {{results}}
    <div style="overflow-y:scroll; padding-left:20px; height:90vh">
      Count: {{recipes.length}}
      <div v-for="recipe in recipes" :key="recipe" style="padding-top: 10px; display: flex">
        <pickup-recipe-vue :idList="recipe" style="background: gray"/>
        {{craftedItem(recipe)}}
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PickupRecipeVue from './components/PickupRecipe.vue';
import PickupCounter from "./components/PickupCounter.vue";
import {crafting} from "./crafting"

let c = new crafting();

export default defineComponent({
  name: 'App',
  components: {
    PickupRecipeVue,
    PickupCounter
  },

  data() {
    return {
      craftingBag: [] as number[],
      pickupCounts: {} as {[n: number]: number},
      recipes: [] as number[][]
    }
  },

  created() {
    c.loadItems()
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

    addBag(id: number) {
      this.craftingBag = [...this.craftingBag, id];
    },

    craftedItem(recipe: number[]) {
      return c.craftItem(recipe);
    },

    countChanged(id:number, count:number) {
      if (!(id in this.pickupCounts)) {
        this.pickupCounts[id] = 0;
      }
      this.pickupCounts[id] = count;
      this.recipes = c.getCombinations({...this.pickupCounts});
    }
  }
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
  height:100vh;
}
</style>
