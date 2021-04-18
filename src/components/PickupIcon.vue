<template>
  <div
    class="pickupIcon"
    v-bind:style="pickupIconStyle"
    @click="pickupClicked"
  ></div>
</template>

<style scoped>
.pickupIcon {
  background-image: url("../assets/ui_crafting.png");
  width: 32px;
  height: 32px;
  background-size: 256px;
}
</style>

<script lang="ts">
import { defineComponent, watch } from "vue";

const offsets: string[] = [];
for (let i = 0; i < 32; ++i) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  offsets.push(`-${x * 32}px -${y * 32}px`);
}

export default defineComponent({
  name: "PickupIcon",
  props: {
    idx: Number,
  },

  data() {
    return {
      offsets,
    };
  },

  emits: ["pickupClicked"],

  methods: {
    pickupClicked() {
      this.$emit("pickupClicked");
    },
  },

  computed: {
    pickupIconStyle(): any {
      return {
        backgroundPosition: this.offsets[this.idx ?? 0],
      };
    },
  },
});
</script>
