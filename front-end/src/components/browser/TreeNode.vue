<script setup>
import { ref, computed } from 'vue';
import { startDrag, onDrop, setBackgroundColor, rmBackgroundColor } from './MoveTreeItem.js';

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
});

const showChildren = ref(false);

const hasChildren = computed(() => {
  const { Bookmarks } = props.node;
  return Bookmarks;
});

const toggleChildrenIcon = computed(() => {
  const folderClosed = "/src/assets/icons/folder-solid.svg";
  const folderOpen = "/src/assets/icons/folder-open-solid.svg";
  return showChildren.value ? folderOpen : folderClosed;
});

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
    class="node item itemPadding"
    draggable="true"
    @dragstart="startDrag($event, node)">

    <span style="color: orange">{{ node.Id }}</span>
    <span>{{ node.Title.toLowerCase() }}</span>
  </div>

  <div
    v-else-if="node.Type == 'Folder'"
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
      :node="child" />
  </div>
</template>


<style scoped>
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
  margin: 7px;
  font-family: var(--bks-big-text);
  cursor: default;
  box-shadow: 0 0 10px -2px black;
  transition: background-color 0.1s ease;
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

*
div.item:hover {
  /*
  background-color: var(--rp-muted);
  color: black;
  */
  color: var(--rp-iris);
  cursor: pointer;
}
</style>
