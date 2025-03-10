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

<style scoped>
div {
  height: 100vh;
  width: 400px;
  background-color: var(--rp-base);
}
</style>

<style>
/* Overwrite the default app size for full-screen */
#app {
  width: 100vw;
  margin: 0;
  padding: 0;
}
</style>
