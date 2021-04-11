<template>
  <div v-bind:style="pickupIconStyle"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PickupIcon',
  props: {
    idx: Number
  },
  data() {
    let x = (this.idx ?? 0) % 8, y = Math.floor((this.idx ?? 0) / 8);
    return {
      pickupIconStyle: {
        backgroundImage: `url(${require('@/assets/ui_crafting.png')})`,
        width: "16px",
        height: "16px",
        backgroundPosition: `-${x * 16}px -${y * 16}px`,
        float: "left",
      }
    }
  }
});
</script>