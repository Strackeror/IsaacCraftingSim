<template>
  <div v-bind:style="pickupIconStyle" @click="pickupClicked"></div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'PickupIcon',
  props: {
    idx: Number
  },

  emits: ['pickupClicked'],

  methods: {
    pickupClicked() {
      this.$emit("pickupClicked");
    }

  },

  computed: {
    pickupIconStyle(): any {
      let val = this.idx ?? 0;
      let x = val % 8, y = Math.floor(val / 8);
      let backgroundPosition = `-${x * 32}px -${y * 32}px`;
      return {
          imageRendering: "crisp-edges",
          backgroundImage: `url(${require('@/assets/ui_crafting.png')})`,
          width: "32px",
          height: "32px",
          backgroundSize: "256px",
          backgroundPosition,
      }
    }
  }
});
</script>