<template>
  <div style="display: flex; flex-direction: column; padding-left:5px">
    <pickup-icon v-bind:idx="idx" @pickupClicked="addBag" />

    <input
      type="number"
      min="0"
      max="99"
      style="width:30px"
      v-model="count"
      @change="countChanged(count)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import PickupIcon from "./PickupIcon.vue";

export default defineComponent({
  name: "PickupCounter",
  components: {
    PickupIcon,
  },
  props: {
    idx: Number,
  },
  data() {
    return {
      count: 0,
    };
  },

  emits: ["addBag", "countChanged"],

  methods: {
    countChanged(val: number) {
      this.$emit("countChanged", this.idx ?? 0, val);
    },

    add() {
      this.count += 1;
      this.$emit("countChanged", this.idx ?? 0, this.count);
    },

    remove() {
      if (this.count > 0) {
        this.count -= 1;
        this.$emit("countChanged", this.idx ?? 0, this.count);
      }
    },

    addBag() {
      this.$emit("addBag", this.idx ?? 0);
    },
  },
});
</script>
