<template>
  <div
    style="display: flex; flex-direction: column; padding-left:5px; align-items:center"
    @wheel.prevent="mouseWheel($event)"
  >
    <div class="pickupIcon">
      <pickup-icon v-bind:idx="idx" @pickupClicked="addBag" />
    </div>

    <input
      type="number"
      min="0"
      max="99"
      style="width:30px"
      v-model="inputCount"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PickupIcon from "./PickupIcon.vue";

export default defineComponent({
  name: "PickupCounter",
  components: {
    PickupIcon,
  },
  props: {
    idx: Number,
    count: Number,
  },

  emits: ["addBag", "update:count"],

  methods: {
    addBag() {
      this.$emit("addBag", this.idx ?? 0);
    },

    mouseWheel(event: WheelEvent) {
      if (event.deltaY > 0) {
        this.inputCount -= 1;
      } else if (event.deltaY < 0) {
        this.inputCount += 1;
      }
    },
  },

  computed: {
    inputCount: {
      get(): number {
        return this.count ?? 0;
      },
      set(value: number) {
        if (value >= 0) {
          this.$emit("update:count", value);
        }
      },
    },
  },
});
</script>

<style scoped>
.pickupIcon:hover {
  background: gray;
}
</style>
