<script setup>
import Node from '../node/Node.vue';
import NodeInfo from '../node/NodeInfo.vue';
import { bookiesTreeRef } from '@/lib/folderTree.js';
import {
  onDrop,
  setBackgroundColor,
  rmBackgroundColor
} from '../BrowserMoveTreeItem.js';
</script>

<template>
  <div
    class="main-view root drop-zone"
    @dragover.prevent
    @dragenter.prevent="setBackgroundColor"
    @dragleave.prevent="rmBackgroundColor"
    @drop.prevent.stop="onDrop($event, 0);
      rmBackgroundColor($event)" >

    <Node
      v-for="(node, index) in bookiesTreeRef.Bookmarks"
      :key="node.Id"
      :node="node"
      :index="index"
      :parentId="0"
      :enableTree="false"
      />

    <NodeInfo />
  </div>
</template>

<style scoped>
div.main-view {
  position: relative;
  width: 100%;
  height: 100%;
}

div.root {
  box-sizing: border-box;
  height: 100%;
  border: 7px solid var(--rp-base);
  border-radius: 10px;
  background-color: var(--rp-base);
}

div.drop-zone.dragover {
  background-color: var(--rp-highlight-high);
}
</style>
