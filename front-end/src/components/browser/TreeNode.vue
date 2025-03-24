<script setup>
import { ref, computed } from 'vue';
import { MoveTreeItem } from '@/stores/folderTree.js'

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
  const pointRight = "/src/assets/icons/folder.svg";
  const pointDown = "/src/assets/icons/folder_open.svg";
  return showChildren.value ? pointDown : pointRight;
});

function toggleChildren() {
  showChildren.value = !showChildren.value;
}

// Drag and drop functionality.
function startDrag(event, item) {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.Id);
}

// Gather and emit the ID of the new parent and the child.
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
    v-if="node.Type == 'Bookmark'"
    class="item node drag-el"
    draggable="true"
    @dragstart="startDrag($event, node)">

    <span style="color: orange">{{ node.Id }}</span>
    <span>{{ node.Title.toLowerCase() }}</span>
  </div>

  <div
    v-else-if="node.Type == 'Folder'"
    class="node drop-zone" @dragover.prevent
    @dragenter.prevent="setBackgroundColor"
    @dragleave="rmBackgroundColor"
    @drop.prevent.stop="onDrop($event, node.Id); rmBackgroundColor($event)">

    <div
      class="item drag-el"
      draggable="true"
      @click="toggleChildren"
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
  background-color: rgb(49, 48, 92);
}

div.node {
  width: fit-content;
  border-radius: 7px;
  padding: 2px;
  margin: 7px;
  background-color: rgba(235, 188, 186, 0.3);
  font-family: var(--bks-big-text);
  cursor: default;
  box-shadow: 0 0 10px -2px black;
  transition: background-color 0.1s ease;
}

div.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 5px 9px;
  border-radius: 5px;
  background-color: var(--rp-highlight-low);
  transition: background-color 0.2s ease;
}

div.item:hover {
  background-color: var(--rp-highlight-high);
  color: black;
  cursor: pointer;
}
</style>
