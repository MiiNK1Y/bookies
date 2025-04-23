<script setup>
import Node from '@/components/browser/node/Node.vue';
import NodeInfo from '@/components/browser/NodeInfo.vue';

import { onDrop, setBackgroundColor, rmBackgroundColor } from '@/components/browser/BrowserMoveTreeItem.js';
import { state } from '@/stores/bookies.js';
</script>


<template>
  <div
    class="main-view root drop-zone"
    @dragover.prevent
    @dragenter.prevent="setBackgroundColor($event)"
    @dragleave.prevent="rmBackgroundColor($event)"
    @drop.prevent.stop="onDrop($event, 0);
      rmBackgroundColor($event)" >

    <Node
      v-for="(node, index) in state.bookies.regular.Bookmarks"
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
