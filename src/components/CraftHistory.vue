<template>
  <div class="panel">
    History
    <div class="recipeList">
      <div
        v-for="recipeEntry in recipeHistory"
        :key="recipeEntry"
        class="recipeEntry"
      >
        <img
          :src="`./collectibles/${items[recipeEntry.item].img}`"
          style="image-rendering: crisp-edges"
          height="64"
          width="64"
        />
        <pickup-recipe :idList="recipeEntry.recipe" />
      </div>
    </div>
    <button v-if="recipeHistory.length" @click="undo">Undo</button>
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  width: 200px;
  border: 5px solid gray;
  align-items: center;
  flex-shrink: 0;
}
.recipeList {
  display: flex;
  flex-direction: column;
}

.recipeEntry {
  background: gray;
  display: flex;
  border-top: 5px solid lightgray;
  align-self: center;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import PickupRecipe from "./PickupRecipe.vue";
import * as items from "../items";

export interface RecipeEntry {
  recipe: number[];
  craftBag: number[];
  item: number;
}

export default defineComponent({
  components: {
    PickupRecipe,
  },

  props: {
    recipeHistory: Object as PropType<RecipeEntry>,
  },

  emits: ["undo", "clear"],

  methods: {
    undo() {
      this.$emit("undo");
    },
    clear() {
      this.$emit("clear");
    },
  },

  computed: {
    items() {
      return items.items;
    },
  },
});
</script>
