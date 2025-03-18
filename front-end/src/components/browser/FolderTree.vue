<script setup>
import TreeNodeFlat from './TreeNodeFlat.vue';
import { b, bookies } from '@/bookies/load.js';

function movedItem(updatedFlat) {
  b.flatBookies = updatedFlat;
  console.log("updated flat bookies: ", updatedFlat);
}
</script>

<template>
  {{ console.log("original flatBookies: ", b.flatBookies) }}
  <TreeNodeFlat v-for="node in bookies.Bookmarks" :key="node" :node="node" @updatedBookies="movedItem" />
</template>
