<script setup>
import { RouterView } from 'vue-router';
import BrowserTree from '@/components/browser/BrowserTree.vue';
import BrowserNavbar from '@/components/browser/BrowserNavbar.vue';
</script>

<template>
  <div class="parent">
    <div class="folder-tree">
      <BrowserTree />
    </div>
    <div class="navbar">
      <BrowserNavbar />
    </div>
    <div class="browser-view">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
div.parent {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 5px;
  box-sizing: border-box;
  border: 5px solid black;
  font-family: var(--bks-regular-text);
}

div.parent,
div.folder-tree,
div.browser-view {
  height: 100%;
}

div.folder-tree,
div.navbar,
div.browser-view {
  border-radius: 10px;
}

div.folder-tree {
  grid-row: span 2 / span 2;
  position: relative;
  overflow: scroll;
  background-color: var(--rp-base);
}

div.folder-tree,
div.browser-view {
  position: relative;
}

div.navbar,
div.browser-view {
  display: flex;
}

div.navbar {
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: var(--rp-highlight-med);
  overflow: hidden;
}

div.browser-view {
  background-color: var(--rp-highlight-low);
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
