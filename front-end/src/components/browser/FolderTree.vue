<script setup>
import { getBookies, sample } from '@/controllers/api.js';
import TreeNode from './TreeNode.vue';

// const bookies = getBookies();
</script>

<template>
  <TreeNode v-for="node in sample.Bookmarks" :key="node" :node="node" />
</template>
