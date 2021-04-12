<template>
  <div v-bind:style="pickupIconStyle"></div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'PickupIcon',
  props: {
    idx: Number
  },

  computed: {
    pickupIconStyle(): any {
      let val = this.idx ?? 0;
      let x = val % 8, y = Math.floor(val / 8);
      let backgroundPosition = `-${x * 16}px -${y * 16}px`;
      return {
          backgroundImage: `url(${require('@/assets/ui_crafting.png')})`,
          width: "16px",
          height: "16px",
          backgroundPosition,
      }
    }
  }
});
</script>