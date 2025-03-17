<script setup>
// import { sample } from '@/controllers/api.js';
import { bookies } from '@/bookies/load.js';
import TreeNode from './TreeNode.vue';

// The original Bookies.json data, unmodified.
const Bookies = bookies.bookies;
</script>

<template>
  <TreeNode v-for="node in Bookies.Bookmarks" :key="node" :node="node" />
</template>
