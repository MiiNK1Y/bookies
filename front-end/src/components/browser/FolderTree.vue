<script setup>
import { sample } from '@/controllers/api.js';
import TreeNode from './TreeNode.vue';
</script>

<template>
  <TreeNode v-for="node in sample.Bookmarks" :key="node" :node="node" />
</template>
