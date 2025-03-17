<script setup>
import FolderTree from '@/components/browser/FolderTree.vue';
//import FolderTree from '@/components/browser/FolderTreeFlat.vue';
</script>

<template>
  <div class="parent">
    <div class="folder-tree">
      <FolderTree />
    </div>
    <div class="navbar">
      some text
    </div>
    <div class="browser-view">
      some text
    </div>
  </div>
</template>

<style scoped>
div.parent {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 5px;
  height: 100%;
}

div.folder-tree {
  position: relative;
  grid-row: span 2 / span 2;
  background-color: var(--rp-base);
  overflow: scroll;
}

div.navbar,
div.browser-view {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--rp-highlight-low);
  font-family: var(--bks-regular-text);
}

div.navbar {
  background-color: var(--rp-highlight-med);
}
</style>

<style>
/* Overwrite #app container */
#app {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  font-weight: normal;
}
</style>
