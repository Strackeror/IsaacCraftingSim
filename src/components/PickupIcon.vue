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
  data() {
    return {
      pickupIconStyle: {
        backgroundImage: `url(${require('@/assets/ui_crafting.png')})`,
        width: "16px",
        height: "16px",
        backgroundPosition: `0px 0px`,
        float: "left",
      }
    }
  },

  watch: {
    idx(val) {
      let x = val % 8, y = Math.floor(val / 8);
      this.pickupIconStyle.backgroundPosition = `-${x * 16}px -${y * 16}px`;
    }
  }
});
</script>