
<template>
  <div class="panel">
    History
    <button v-if="recipeHistory.length" @click="clear">Clear</button>
    <div class="recipeList">
      <div v-for="recipeEntry in recipeHistory" :key="recipeEntry" class="recipeEntry">
        {{recipeEntry.item}}
        <pickup-recipe :idList="recipeEntry.recipe" class="pickupRecipe"/>
      </div>
    </div>
    <button v-if="recipeHistory.length" @click="undo">Undo</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import PickupRecipe from "./PickupRecipe.vue";

export interface RecipeEntry {
  recipe: number[],
  craftBag: number[],
  item: number,
}

export default defineComponent({
  components: {
    PickupRecipe,
  },

  props: {
    recipeHistory: Object as PropType<RecipeEntry>,
  },

  emits: ['undo', 'clear'],

  methods: {
    undo() {
      this.$emit("undo");
    },
    clear() {
      this.$emit("clear");
    }
  }

})
</script>

<style scoped>
.panel {
  display:flex;
  flex-direction: column;
  align-content: center;
  width: 200px;
  border: 5px solid #999
}
.pickupRecipe {
  background: gray;
}
.recipeList {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.recipeEntry {
  display: flex;
  padding-top: 5px;
}
</style>
