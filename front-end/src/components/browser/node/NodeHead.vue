<!-- NOTE: NodeHead.vue -->

<script setup>
import NodeFace from './NodeFace.vue';

const props = defineProps({
  type: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div
    @mouseover=""
    @mouseleave=""
    @dragstart=""
    @dragend=""
    @click=""
    :class=""
    draggable="true"
    class="" >

    <NodeFace :type="type"/>
  </div>
</template>
