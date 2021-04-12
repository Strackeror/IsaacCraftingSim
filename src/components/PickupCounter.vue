<template>
  <div style="display: flex">
    <pickup-icon v-bind:idx="idx"/>
    
    <button v-on:click="add">+</button>
    <button v-on:click="remove">-</button>
    <button v-on:click="addBag">B</button>
    {{count}}
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import PickupIcon from "./PickupIcon.vue";

export default defineComponent({
  name: 'PickupCounter',
  components: {
    PickupIcon
  },
  props: {
    idx: Number
  },
  data() {
    return {
      count: 0,
    }
  },

  emits: ['addBag', 'countChanged'],

  methods: {
    add() {
      this.count += 1;
      this.$emit('countChanged', this.idx ?? 0, this.count);
    },

    remove() {
      if (this.count > 0) {
        this.count -= 1
        this.$emit('countChanged', this.idx ?? 0, this.count);
      }
    },

    addBag() {
      this.$emit('addBag', this.idx ?? 0)
    }
  }
});
</script>