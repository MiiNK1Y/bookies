<!-- NOTE: HoverZone.vue -->

<script setup>
const props = defineProps({
  type: {
    type: Object,
    required: true
  },
  position: {
    type: String,
    required: true
  }
});
</script>

<template>

  <!-- Top / bottom hover-mask -->
  <div
    v-if="position === 'top'"
    v-show=""
    @dragenter.stop=""
    @dragleave.stop=""
    @drop.prevent.stop=""
    class=""
    :class="">

    <div
      v-show=""
      class="">
    </div>
  </div>

  <!-- Middle folder hover-mask (for hover-to-open) -->
  <div
    v-else-if="node.Type === 'Folder'"
    v-show=""
    @dragenter.stop=""
    @dragleave.stop=""
    @drop.prevent.stop=""
    class="">
  </div>
</template>
