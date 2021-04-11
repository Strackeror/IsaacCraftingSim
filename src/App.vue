<template>
  <pickup-recipe-vue v-bind:idList="craftingBag" />
  <button v-on:click="addHeart">Add heart</button>
  <button v-on:click="addPenny">Add penny</button>
  <button v-on:click="resetBag">Reset</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PickupIcon from "./components/PickupIcon.vue";
import PickupRecipeVue from './components/PickupRecipe.vue';

export default defineComponent({
  name: 'App',
  components: {
    PickupRecipeVue
  },

  data() {
    return {
      craftingBag: [] as number[]
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
