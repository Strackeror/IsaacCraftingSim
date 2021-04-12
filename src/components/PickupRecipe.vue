<template>
  <div style="width:64px; height:32px; display: grid; grid-template-rows: 16px 16px; grid-template-columns: 16px 16px 16px 16px">
      <pickup-icon v-bind:idx="ids[0]" />
      <pickup-icon v-bind:idx="ids[1]"/>
      <pickup-icon v-bind:idx="ids[2]" />
      <pickup-icon v-bind:idx="ids[3]" />
      <pickup-icon v-bind:idx="ids[4]" />
      <pickup-icon v-bind:idx="ids[5]" />
      <pickup-icon v-bind:idx="ids[6]" />
      <pickup-icon v-bind:idx="ids[7]" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PickupIcon from "./PickupIcon.vue";

export default defineComponent({
  name: "PickupRecipe",
  components: {
    PickupIcon,
  },
  props: {
    idList: Array,
  },
  data() {
    return {}
  },

  computed: {
    ids() {
      let ret: number[] = []
      for (let i of this.idList ?? []) {
        ret.push(Number(i));
      }
      while (ret.length < 8) {
        ret.push(0);
      }
      console.log(ret)
      return ret;
    }
  },
});
</script>
