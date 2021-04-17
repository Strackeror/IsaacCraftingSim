<template>
  <div style="display: flex; background: #999; padding-top:20px">
    <div
      style="overflow-y:auto; padding-left:20px; height:90vh; width: 30vw; display: flex; flex-wrap: wrap; align-content: flex-start"
    >
      <div
        class="item"
        v-for="(value, id) in itemRecipeMap"
        :key="id"
        @mouseover="hoveredItem = id"
        @mouseout="hoveredItem = 0"
        @click="selectItem(id)"
        :style="`border-style: solid; border-color: ${itemBorderColor(id)}`"
      >
        <img
          :src="`./collectibles/${items[id].img}`"
          style="image-rendering: crisp-edges"
          height="64"
          width="64"
        />
      </div>
    </div>
    <div
      class="shownRecipePanel"
      style="overflow-y:auto; padding-left:20px; height:90vh; width: 150px"
    >
      <div v-if="shownItem">
        {{ items[shownItem].name }}
      </div>
      <div v-if="shownItem">
        <img
          :src="`./collectibles/${items[shownItem].img}`"
          style="image-rendering: crisp-edges"
          height="64"
          width="64"
        />
      </div>
      <div
        class="shownRecipeEntry"
        v-for="recipe in shownRecipes"
        :key="recipe"
      >
        <div class="shownRecipe">
          <pickup-recipe
            :idList="recipe"
            @click="recipeClicked(recipe, shownItem)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.shownRecipePanel {
  height: 90vh;
  overflow-y: auto;
  padding-left: 20px;
  width: 150px;
  display: flex;
  flex-direction: column;
}

.shownRecipeEntry {
  display: flex;
  padding-top: 10px;
}

.shownRecipe {
  background: gray;
}

.shownRecipe:hover {
  background: lightgray;
}

.item:hover {
  background: lightgray;
}

.item {
  background: gray;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import PickupRecipe from "./PickupRecipe.vue";
import * as crafting from "../crafting";
import * as items from "../items";

type ItemRecipeMap = { [id: number]: number[][] };

export default defineComponent({
  name: "CraftableItems",
  components: {
    PickupRecipe,
  },
  props: {
    pickupCounts: Object as PropType<{ [n: number]: number }>,
    pickupsInBag: Object as PropType<number[]>,
  },

  data() {
    return {
      selectedItem: 0,
      hoveredItem: 0,
    };
  },

  emits: ["recipeClicked"],

  methods: {
    selectItem(id: number) {
      this.selectedItem = this.selectedItem == id ? 0 : id;
    },

    itemBorderColor(id: number) {
      if (this.selectedItem == id) {
        return "green";
      }
      return "darkgray";
    },

    recipeClicked(recipe: number[], item: number) {
      this.$emit("recipeClicked", recipe, item);
    },
  },

  computed: {
    items() {
      return items.items;
    },

    itemRecipeMap(): ItemRecipeMap {
      const map: ItemRecipeMap = {};

      const combinations = crafting.getCombinations(
        {
          ...(this.pickupCounts ?? {}),
        },
        [...(this.pickupsInBag ?? [])]
      );

      for (const recipe of combinations) {
        const item = crafting.craftItem([...recipe]);
        if (item) {
          map[item] = map[item] ?? [];
          map[item].push(recipe);
        }
      }
      return map;
    },

    shownItem(): number {
      if (this.hoveredItem) return this.hoveredItem;
      if (this.selectedItem in this.itemRecipeMap) return this.selectedItem;
      return 0;
    },

    shownRecipes() {
      const recipes: number[][] = [];

      if (this.itemRecipeMap && this.shownItem in this.itemRecipeMap) {
        for (let recipe of this.itemRecipeMap[this.shownItem]) {
          recipes.push(recipe);
        }
      }

      return recipes;
    },
  },
});
</script>
