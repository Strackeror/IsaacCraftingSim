<template>
  <div style="display: flex">
    <div style="overflow-y:auto; padding-left:20px; height:90vh; width: 30vw; display: flex; flex-wrap: wrap">
      <div class="item"
        v-for="(value,id) in itemRecipeMap"
        :key="id"
        @mouseover="hoveredRecipes = value"
        @mouseout="hoveredRecipes = []"
        style="height: 40px; width: 40px; border-style: solid"
      >
        {{ id }}
      </div>
    </div>
    <div style="overflow-y:auto; padding-left:20px; height:90vh">
      <div
        v-for="recipe in hoveredRecipes"
        :key="recipe"
        style="padding-top: 10px; display: flex"
      >
        <pickup-recipe :idList="recipe" style="background: gray" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { crafting } from "../crafting";
import PickupRecipe from "./PickupRecipe.vue";

let craft = new crafting();

type ItemRecipeMap = { [id: number]: number[][] };

export default defineComponent({
  name: "CraftableItems",
  components: {
    PickupRecipe,
  },
  props: {
    pickupCounts: Object as PropType<{ [n: number]: number }>,
  },

  data() {
    return {
      hoveredRecipes: [] as number[][],
    };
  },

  created() {
    craft.loadItems();
  },

  computed: {
    itemRecipeMap(): ItemRecipeMap {
      const map: ItemRecipeMap = {};

      const combinations = craft.getCombinations({...(this.pickupCounts ?? {})});
      for (const recipe of combinations) {
        const item = craft.craftItem([...recipe]);
        if (item) {
          map[item] = map[item] ?? [];
          map[item].push(recipe);
        }
      }
      return map;
    },
  },
});
</script>

<style>
.item:hover {
  background: lightgray
}

.item {
  background: gray;
}

</style>

