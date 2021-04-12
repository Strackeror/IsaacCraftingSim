<template>
  <div style="display: flex">
    <div>
      <pickup-recipe-vue v-bind:idList="craftingBag" />
      <button @click="resetBag">   Reset   </button>
      <pickup-counter v-for="n in [1, 2, 3, 4, 5]" :key="n" :idx="n" @addBag="addBag" @countChanged="countChanged"/>
    </div>
      {{results}}
    <div style="overflow:scroll; height:400px">
      Count: {{recipes.length}}
      <pickup-recipe-vue v-for="recipe in recipes" :key="recipe" :idList="recipe" style="padding-top: 10px"/>
    </div>
    <div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PickupIcon from "./components/PickupIcon.vue";
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
}
</style>
