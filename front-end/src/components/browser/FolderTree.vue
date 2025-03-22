<script setup>
import TreeNode from './TreeNode.vue';
import { bookiesTreeRef } from '@/stores/folderTree.js';
import { MoveTreeItem } from '@/stores/folderTree.js';

function onDrop(event, parent) {
  const itemID = Number(event.dataTransfer.getData("itemID"));
  new MoveTreeItem(parent, itemID);
}

function setBackgroundColor(event) {
  if (event.target.classList.contains("drop-zone")) {
    event.target.classList.add("dragover");
  }
}

function rmBackgroundColor(event) {
  if (event.target.classList.contains("drop-zone")) {
    event.target.classList.remove("dragover");
  }
}
</script>

<template>
  <div
    class="root drop-zone"
    @dragover.prevent
    @dragenter.prevent="setBackgroundColor"
    @dragleave="rmBackgroundColor"
    @drop.prevent.stop="onDrop($event, null); rmBackgroundColor($event)" >

    <TreeNode
      v-for="node in bookiesTreeRef.Bookmarks"
      :key="node.Id"
      :node="node"
      />
  </div>
</template>

<style scoped>
div.root {
  padding: 10px;
}

div.drop-zone.dragover {
  background-color: rgb(49, 48, 92);
}
</style>
