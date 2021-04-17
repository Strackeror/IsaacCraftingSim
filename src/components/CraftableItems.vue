<template>
  <div style="display: flex; flex: 1">
    <div class="itemListPanel">
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
    <div class="shownRecipePanel">
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
.itemListPanel {
  padding-left: 10px;
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  flex: 1;
  height: 90vh;
  overflow: auto;
  border: 5px solid gray;
  border-right: 0;
}

.shownRecipePanel {
  padding-top: 10px;
  overflow-y: auto;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
  height: 90vh;
  border: 5px solid gray;
  border-right: 0;
}

.shownRecipeEntry {
  display: flex;
  padding-top: 10px;
}

.shownRecipe {
  background: gray;
}

.shownRecipe:hover {
  background: #6a6;
}

.item:hover {
  background: #6a6;
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
    selectedItem: Number,
  },

  data() {
    return {
      hoveredItem: 0,
    };
  },

  emits: ["recipeClicked", "update:selectedItem"],

  methods: {
    selectItem(id: string) {
      this.$emit("update:selectedItem", +id);
    },

    itemBorderColor(id: number) {
      if (this.selectedItem == id) {
        return "green";
      }
      return "lightgray";
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
      if (this.selectedItem && this.selectedItem in this.itemRecipeMap) {
        return this.selectedItem;
      }
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
