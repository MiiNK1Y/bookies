<script setup>
import TreeNode from './TreeNode.vue';
import { bookiesTreeRef } from '@/stores/folderTree.js';
import { startDrag, onDrop, setBackgroundColor, rmBackgroundColor } from './MoveTreeItem.js';
</script>

<template>
  <div
    class="root drop-zone"
    @dragover.prevent
    @dragenter.prevent="setBackgroundColor"
    @dragleave="rmBackgroundColor"
    @drop.prevent.stop="onDrop($event, 0); rmBackgroundColor($event)" >

    <TreeNode
      v-for="(node, index) in bookiesTreeRef.Bookmarks"
      :key="node.Id"
      :node="node"
      :parentId="0"
      :index="index"
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
