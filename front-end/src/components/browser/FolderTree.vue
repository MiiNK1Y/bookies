<script setup>
import { getBookies } from '@/controllers/api.js';
import TreeNode from './TreeNode.vue';
import { ref } from 'vue';

// const bookies = getBookies();

// NOTE: Sample data.
import sampleBookies from '@/assets/samples/Bookies.json';
const sample = ref(sampleBookies);
</script>

<template>
  <div>
    <TreeNode
      v-for="node in sample.Bookmarks"
      :key="node"
      :node="node"
    />
  </div>
</template>
