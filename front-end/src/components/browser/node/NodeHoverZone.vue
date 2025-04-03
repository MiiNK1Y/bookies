<!-- NOTE: NodeHoverZone.vue -->

<script setup>
import NodeHoverMask from './NodeHoverMask.vue';

const props = defineProps({
  type: { type: Object, required: true },
});
</script>

<template>

  <!-- Top / bottom hover-mask -->
  <div
    v-show="dragMode"
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

<style scoped>
div.bookmark-mask { height: 50%; }
div.folder-mask { height: 5px; }

div.item-top-mask { top: 0; }
div.item-bottom-mask { bottom: 0; }
</style>
