<script setup>
//import BrowserNode from './BrowserNode.vue';

import Node from './node/Node.vue';
import { bookiesTreeRef } from '@/stores/folderTree.js';
import { onDrop, setBackgroundColor, rmBackgroundColor } from './BrowserMoveTreeItem.js';
</script>

<template>
  <div
    class="root drop-zone"
    @dragover.prevent
    @dragenter.prevent="setBackgroundColor"
    @dragleave.prevent="rmBackgroundColor"
    @drop.prevent.stop="onDrop($event, 0); rmBackgroundColor($event)" >

    <Node
      v-for="(node, index) in bookiesTreeRef.Bookmarks"
      :key="node.Id"
      :node="node"
      :index="index"
      :parentId="0"
      :enableTree="true"
      />
  </div>
</template>

<style scoped>
div.root {
  box-sizing: border-box;
  height: 100%;
  border: 7px solid var(--rp-base);
  border-radius: 1em;
  background-color: var(--rp-base);
}

div.drop-zone.dragover { background-color: var(--rp-highlight-high); }
</style>
