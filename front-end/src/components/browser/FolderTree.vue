<script setup>
// import { sample } from '@/controllers/api.js';
import { bookies } from '@/bookies/load.js';
//import TreeNode from './TreeNode.vue';
import TreeNodeFlat from './TreeNodeFlat.vue';
import { ref } from 'vue';

// The original Bookies.json data, unmodified.
const Bookies = ref(bookies.bookies);
</script>


<template>
  <TreeNodeFlat v-for="node in Bookies.Bookmarks" :key="node" :node="node" />
</template>
