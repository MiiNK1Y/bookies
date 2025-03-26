<script setup>
import { ref, computed } from 'vue';

import {
  dragMode,
  startDrag,
  onDrop,
  onPositionDrop,
  setBackgroundColor,
  rmBackgroundColor
} from './MoveTreeItem.js';

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  parentId: {
    type: Number,
  },
  index: {
    type: Number,
    required: true
  }
});

/*
* TODO:
* Add functionality to add a third parameter to onDrop() that takes \
* either "over" or "under" to know where in the Child array to place the ID \
* before or after the hovered item.
*/

const showChildren = ref(false);
const hoveringTop = ref(false);
const hoveringBottom = ref(false);

const hasChildren = computed(() => {
  const { Bookmarks } = props.node;
  return Bookmarks;
});

const toggleChildrenIcon = computed(() => {
  const folderClosed = "/src/assets/icons/folder-solid.svg";
  const folderOpen = "/src/assets/icons/folder-open-solid.svg";
  return showChildren.value ? folderOpen : folderClosed;
});

function hoverTop(bool) {
  hoveringTop.value = bool;
}

function hoverBottom(bool) {
  hoveringBottom.value = bool;
}

function toggleChildren() {
  showChildren.value = !showChildren.value;
}

function toggleChildrenOn(event, item) {
  const itemID = Number(event.dataTransfer.getData("itemID"));
  if (itemID == item.Id) return;
  showChildren.value = true;
}
</script>


<template>
  <div
    class="wrapper"
    :class="{ hoverTop: hoveringTop, hoverBottom: hoveringBottom }">

    <div
      @dragover.prevent
      @dragleave="hoverTop(false)"
      @dragenter.prevent="hoverTop(true)"
      @drop.prevent.stop="onPositionDrop($event, parentId, 'over', index); hoverTop(false)"
      :class="node.Type === 'Folder' ? { topFolderMask: dragMode } : { topBookmarkMask: dragMode }">
    </div>

    <div
      @dragover.prevent
      @dragleave="hoverBottom(false)"
      @dragenter.prevent="hoverBottom(true)"
      @drop.prevent.stop="onPositionDrop($event, parentId, 'under', index); hoverBottom(false)"
      :class="node.Type === 'Folder' ? { bottomFolderMask: dragMode } : { bottomBookmarkMask: dragMode }">
    </div>

    <div
      v-if="node.Type === 'Bookmark'"
      draggable="true"
      class="node item itemPadding"
      @dragstart="startDrag($event, node)">

      <span><div class="favicon-fill"></div></span>
      <span style="color: orange">{{ node.Id }}</span>
      <span style="color: green">[{{ index }}]</span>
      <span>{{ node.Title.toLowerCase() }}</span>
    </div>

    <div
      v-else-if="node.Type === 'Folder'"
      class="folder drop-zone"
      :class="{ folderPadding: showChildren }"
      @dragover.prevent
      @dragleave="rmBackgroundColor"
      @dragenter.prevent="setBackgroundColor"
      @drop.prevent.stop="onDrop($event, node.Id); rmBackgroundColor($event)">

      <div
        draggable="true"
        class="item"
        :class="showChildren ? 'resized' : 'itemPadding'"
        @click="toggleChildren"
        @dragenter="toggleChildrenOn($event, node)"
        @dragstart="startDrag($event, node)">

        <img :src="toggleChildrenIcon" v-if="hasChildren" />
        <span style="color: orange">{{ node.Id }}</span>
        <span style="color: green">[{{ index }}]</span>
        <span>{{ node.Title.toLowerCase() }}</span>
      </div>

      <TreeNode
        v-show="showChildren"
        v-for="(child, index) in node.Bookmarks"
        :key="child.Id"
        :node="child"
        :parentId="node.Id"
        :index="index"
        class="child" />
    </div>
  </div>
</template>


<style scoped>
div.wrapper {
  position: relative;
  padding: 3px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
}

div.wrapper.hoverTop {
  border-top: 1px solid white;
}

div.wrapper.hoverBottom {
  border-bottom: 1px solid white;
}

div.topBookmarkMask {
  height: 50%;
}

div.topFolderMask {
  height: 5px;
}

div.topBookmarkMask,
div.topFolderMask {
  position: absolute;
  top: 0;
  /*
  background-color: var(--ct-green);
  opacity: 0.3;
  */
  width: 100%;
}

div.bottomBookmarkMask {
  height: 50%;
}

div.bottomFolderMask {
  height: 5px;
}

div.bottomBookmarkMask,
div.bottomFolderMask {
  position: absolute;
  bottom: 0;
  /*
  background-color: var(--ct-peach);
  opacity: 0.3;
  */
  width: 100%;
}

div.favicon-fill {
  width: 18px;
  height: 18px;
}

div.drop-zone.dragover {
  background-color: var(--rp-highlight-high);
}

div.folderPadding {
  padding: 2px;
}

div.folder {
  /*
  background-color: rgba(235, 188, 186, 0.3);
  */
  background-color: hsla(248deg, 13%, 36%, 0.3);
}

div.folder,
div.node {
  /*
  width: fit-content;
  */
  border-radius: 7px;
  font-family: var(--bks-big-text);
  cursor: default;
  /*
  box-shadow: 0 0 10px -2px black;
  */
  transition: background-color 0.1s ease;
}

div.child {
  margin-left: 20px;
}

div.resized {
  padding: 3px 7px;
}

div.itemPadding {
  padding: 5px 9px;
}

div.resizable,
div.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
  background-color: var(--rp-highlight-low);
}

div.item:hover {
  color: var(--rp-iris);
  cursor: pointer;
}
</style>
