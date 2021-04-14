<template>
  <div style="display: flex">
    <div
      style="overflow-y:auto; padding-left:20px; height:90vh; width: 30vw; display: flex; flex-wrap: wrap; align-content: flex-start"
    >
      <div
        class="item"
        v-for="(value, id) in itemRecipeMap"
        :key="id"
        @mouseover="hoveredRecipes = value"
        @mouseout="hoveredRecipes = []"
        style="height: 40px; width: 40px; border-style: solid"
      >
        <img :src="`/collectibles/${items[id].img}`"/>
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
import * as d3 from "d3";

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
      items: {} as {
        [id: number]: {
          name: string;
          img: string;
        };
      },
    };
  },

  created() {
    craft.loadItems();
    (async () => {
      const xmlItems = await d3.xml("/items.xml");
      for (const item of xmlItems.querySelectorAll("passive,active,familiar")) {
        this.items[Number(item.getAttribute("id"))] = {
          name: String(item.getAttribute("name")),
          img: String(item.getAttribute("gfx")),
        };
      }
    })();
  },

  computed: {
    itemRecipeMap(): ItemRecipeMap {
      const map: ItemRecipeMap = {};

      const combinations = craft.getCombinations({
        ...(this.pickupCounts ?? {}),
      });
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
  background: lightgray;
}

.item {
  background: gray;
}
</style>
