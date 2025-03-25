<script setup>
import { ref, computed } from 'vue';
import { dragMode, startDrag, onDrop, setBackgroundColor, rmBackgroundColor } from './MoveTreeItem.js';

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
});

/*
* TODO:
* Add functionality to add a third parameter to onDrop() that takes \
* either "over" or "under" to know where in the Child array to place the ID \
* before or after the hovered item.
*
* TODO:
* Cleanup the duplicate code, move the "If / else" and optimize cude reuse.
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
    v-if="node.Type == 'Bookmark'"
    class="wrapper"
    :class="{ hoverTop: hoveringTop, hoverBottom: hoveringBottom }">

    <div
      :class="{ topMask: dragMode }"
      @dragover.prevent
      @drop.prevent.stop="onDrop($event, node.Id); hoverTop(false)"
      @dragenter.prevent="hoverTop(true)"
      @dragleave="hoverTop(false)">
    </div>

    <div
      :class="{ bottomMask: dragMode }"
      @dragover.prevent
      @drop.prevent.stop="onDrop($event, node.Id); hoverBottom(false)"
      @dragenter.prevent="hoverBottom(true)"
      @dragleave="hoverBottom(false)">
    </div>

    <div
      class="node item itemPadding"
      draggable="true"
      @dragstart="startDrag($event, node)">

      <span><div class="favicon-fill"></div></span>
      <span style="color: orange">{{ node.Id }}</span>
      <span>{{ node.Title.toLowerCase() }}</span>
    </div>
  </div>

  <div
    v-else-if="node.Type == 'Folder'"
    class="wrapper"
    :class="{ hoverTop: hoveringTop, hoverBottom: hoveringBottom }">

    <div
      :class="{ topFolderMask: dragMode }"
      @dragover.prevent
      @drop.prevent.stop="onDrop($event, node.Id); hoveringTop(false)"
      @dragenter.prevent="hoverTop(true)"
      @dragleave="hoverTop(false)">
    </div>

    <div
      :class="{ bottomFolderMask: dragMode }"
      @dragover.prevent
      @drop.prevent.stop="onDrop($event, node.Id); hoveringBottom(false)"
      @dragenter.prevent="hoverBottom(true)"
      @dragleave="hoverBottom(false)">
    </div>

    <div
      class="folder drop-zone"
      :class="{ folderPadding: showChildren }"
      @dragover.prevent
      @dragenter.prevent="setBackgroundColor"
      @dragleave="rmBackgroundColor"
      @drop.prevent.stop="onDrop($event, node.Id); rmBackgroundColor($event)">

      <div
        class="item"
        :class="showChildren ? 'resized' : 'itemPadding'"
        draggable="true"
        @click="toggleChildren"
        @dragenter="toggleChildrenOn($event, node)"
        @dragstart="startDrag($event, node)">

        <img :src="toggleChildrenIcon" v-if="hasChildren" />
        <span style="color: orange">{{ node.Id }}</span>
        <span>{{ node.Title.toLowerCase() }}</span>
      </div>

      <TreeNode
        v-show="showChildren"
        v-for="child in node.Bookmarks"
        :key="child.Id"
        :node="child"
        class="child" />
    </div>
  </div>
</template>


<style scoped>
div.wrapper {
  position: relative;
  width: fit-content;
  padding: 4px;
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
}

div.hoverTop {
  border-top: 1px solid purple;
}

div.hoverBottom {
  border-bottom: 1px solid purple;
}

div.topMask {
  height: 50%;
}

div.topFolderMask {
  height: 5px;
}

div.topMask,
div.topFolderMask {
  position: absolute;
  top: 0;
  /*
  background-color: green;
  opacity: 0.2;
  */
  width: 100%;
}

div.bottomMask {
  height: 50%;
}

div.bottomFolderMask {
  height: 5px;
}

div.bottomMask,
div.bottomFolderMask {
  position: absolute;
  bottom: 0;
  /*
  background-color: red;
  opacity: 0.2;
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
  width: fit-content;
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
  /*
  background-color: var(--rp-muted);
  color: black;
  */
  color: var(--rp-iris);
  cursor: pointer;
}
</style>
