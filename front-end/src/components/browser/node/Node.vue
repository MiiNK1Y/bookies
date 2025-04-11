<!-- NOTE: Node.vue -->

<script setup>
import { ref, computed } from 'vue';
import NodeHead from './NodeHead.vue';
import NodeHoverZone from './NodeHoverZone.vue';
import {
  setBackgroundColor,
  rmBackgroundColor,
  dragMode, onDrop
} from '../BrowserMoveTreeItem.js';


const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  parentId: {
    type: Number,
    required: true
  },
  enableTree: {
    type: Boolean,
    required: false,
    default: false
  }
});


const children = ref({
  show: false,
  icon: computed(() => children.value.show
    ? "/src/assets/icons/folder-open-solid.svg"
    : "/src/assets/icons/folder-solid.svg"
  )
});
</script>


<template>
  <div
    class="wrapper" >

    <NodeHoverZone
      v-show="dragMode"
      :type="node.Type"
      :nodeId="node.Id"
      :parentId="parentId"
      :showChildren="children.show"
      @show-children="children.show = true"
    />

    <!-- Bookmark. -->
    <NodeHead
      v-if="node.Type === 'Bookmark'"
      :node="node"
      :showingChildren="children.show">

      <template #id>{{ node.Id }}</template>
      <template #index>{{ index }}</template>
      <template #title>{{ node.Title }}</template>
    </NodeHead>

    <!-- Folder. -->
    <div
      v-else-if="node.Type === 'Folder'"
      @dragenter="setBackgroundColor($event)"
      @dragleave="rmBackgroundColor($event)"
      @drop.prevent.stop="onDrop($event, node.Id);
        rmBackgroundColor($event);"
      :class="{ 'folder-padding': children.show }"
      class="folder drop-zone" >

      <NodeHead
        :node="node"
        :showingChildren="children.show">

        <template #icon>
          <img
            @click.stop="children.show = !children.show"
            :src="children.icon"
            draggable="false"
          />
        </template>
        <template #id>{{ node.Id }}</template>
        <template #index>{{ index }}</template>
        <template #title>{{ node.Title }}</template>
      </NodeHead>

      <div
        v-show="enableTree && children.show"
        class="children" >

        <Node
          v-for="(child, index) in node.Bookmarks"
          :key="child.Id"
          :node="child"
          :index="index"
          :parentId="node.Id"
          :enableTree />
      </div>
    </div>
  </div>
</template>


<style scoped>
div.wrapper {
  position: relative;
  padding: 3px 3px 3px 0;
}

div.folder {
  border-radius: 7px;
  background-color: hsla(248deg, 13%, 36%, 0.3);
}

div.folder-padding {
  padding: 2px;
}

/* 'dragover' style applied from 'MoveTreeItem.js' */
div.drop-zone.dragover {
  background-color: rgba(0,0,0,0.3) !important;
  border: 2px solid var(--ct-red);
  padding: 0 !important;
}

div.children {
  padding-top: 3px;
  margin-left: 20px;
}
</style>
