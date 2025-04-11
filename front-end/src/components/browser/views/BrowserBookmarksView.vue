<script setup>
import BrowserNode from '../BrowserNode.vue';
import { onDrop, setBackgroundColor, rmBackgroundColor } from '../BrowserMoveTreeItem.js';
import { bookiesTreeRef } from '@/stores/folderTree.js';
</script>

<template>
  <div
    class="main-view root drop-zone"
    @dragover.prevent
    @dragenter.prevent="setBackgroundColor"
    @dragleave.prevent="rmBackgroundColor"
    @drop.prevent.stop="onDrop($event, 0); rmBackgroundColor($event)" >

    <BrowserNode
      v-for="(node, index) in bookiesTreeRef.Bookmarks"
      :key="node.Id"
      :node="node"
      :parentId="0"
      :enableChildren="false"
      :index="index"
      />
  </div>
</template>

<style scoped>
div.main-view {
  width: 100%;
  height: 100%;
}
div.root {
  box-sizing: border-box;
  height: 100%;
  border: 7px solid var(--rp-base);
  border-radius: 1em;
  background-color: var(--rp-base);
}

div.drop-zone.dragover { background-color: var(--rp-highlight-high); }
</style>
