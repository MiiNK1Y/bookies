<!-- NOTE: Node.vue -->

<script setup>
import { ref } from 'vue';
import NodeHead from './NodeHead.vue';
import NodeHoverZone from './NodeHoverZone.vue';
import { stateRefs } from '@/stores/folderTree.js';
import {
  setBackgroundColor,
  rmBackgroundColor,
  dragMode
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


const hoveringThis = ref(false);


const children = ref({
  show: false,
  exists: computed(() => props.node.Bookmarks),
  icon: computed(() => children.value.show
    ? "/src/assets/icons/folder-open-solid.svg"
    : "/src/assets/icons/folder-solid.svg"
  )
});


const thisNodeIsSelected = computed(() =>
  stateRefs.value.selectedItem == props.node.Id
);
</script>


<template>
  <div
    @mouseover="hoveringThis = thisNodeIsSelected ? false : true"
    @mouseleave="hoveringThis = false"
    :class="{ 'inactive-hover': hoveringThis }"
    class="wrapper">

    <NodeHoverZone
      v-show="dragMode"
      :type="node.Type"
      :id="node.Id"
      :parentId="parentId"
      :showChildren="children.show"
      @show-children="children.value.show = true"
    />

    <!-- Bookmark. -->
    <NodeHead
      v-if="node.Type === 'Bookmark'"
      :type="Bookmark" >

      <template #id>{{ node.Id }}</template>
      <template #index>{{ index }}</template>
      <template #title>{{ node.Title }}</template>
    </NodeHead>

    <!-- Folder. -->
    <div
      v-else-if="node.Type === 'Folder'"
      @dragover.prevent
      @dragenter.prevent.stop="setBackgroundColor($event)"
      @dragleave.prevent.stop="rmBackgroundColor($event)"
      @drop.prevent.stop="onDrop($event, node.Id);
        rmBackgroundColor($event);"
      :class=""
      class="" >

      <NodeHead
        :type="Folder" >

        <template #id>{{ node.Id }}</template>
        <template #index>{{ index }}</template>
        <template #title>{{ node.Title }}</template>
      </NodeHead>

      <Node
        v-show="enableTree && children.show"
        v-for="(child, index) in node.Bookmark"
        :key="child.Id"
        :node="child"
        :index="index"
        :parentId="node.Id"
        :enableTree
        class="child" />
    </div>
  </div">
</template>


<style scoped>
div.wrapper {
  position: relative;
  padding: 3px;
}

div.node {
  border-radius: 7px;
  font-family: var(--bks-big-text);
  cursor: default;
}

div.child { margin-left: 20px; }

div.inactive-hover {
  background-color: var(--ct-surface_0);
  cursor: default;
}
</style>
