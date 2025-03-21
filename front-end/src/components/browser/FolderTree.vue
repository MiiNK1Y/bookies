<script setup>
import TreeNode from './TreeNode.vue';
import { bookiesRef } from '@/stores/folderTree.js'
</script>

<template>
  <TreeNode v-for="node in bookiesRef.Bookmarks" :key="node.Id" :node="node" />
</template>
