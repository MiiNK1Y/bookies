<script setup>
import FolderTreeItem from './FolderTreeItem.vue';
import { getBookies } from '@/api.js';

const bookies = getBookies();
</script>

<template>
  <div>
    <FolderTreeItem />
  </div>
  {{ console.log(bookies) }}
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
