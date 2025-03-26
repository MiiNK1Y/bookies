<script setup>
import { ref, computed } from 'vue';
import { dragMode, startDrag, onDrop, setBackgroundColor,
rmBackgroundColor } from './MoveTreeItem.js';

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
  }
});

const showChildren = ref(false);
const hoveringTop = ref(false);
const hoveringBottom = ref(false);

function toggleChildren() { showChildren.value = !showChildren.value; }
function toggleHoveringTop(bool) { hoveringTop.value = bool; }
function toggleHoveringBottom(bool) { hoveringBottom.value = bool; }

const hasChildren = computed(() => { return props.node.Bookmarks; });

function toggleChildrenOn(event, item) {
  const itemID = Number(event.dataTransfer.getData("itemID"));
  if (itemID == item.Id) return;
  showChildren.value = true;
}

const childrenToggledIcon = computed(() => {
  return showChildren.value ? "/src/assets/icons/folder-open-solid.svg" :
    "/src/assets/icons/folder-solid.svg";
});

const itemTypeClass = props.node.Type === 'Bookmark'
  ? 'bookmark-mask' : 'folder-mask';

const hoveringMaskPosition = {
    toggleHoveringTop: hoveringTop,
    toggleHoveringBottom: hoveringBottom
};

</script>


<template>
  <!-- Wrapping container for entire node. -->
  <div
    class="wrapper"
    :class="hoveringMaskPosition">

    <!-- Top hover-mask. -->
    <div
      v-show="dragMode"
      @dragleave="toggleHoveringTop(false)"
      @dragenter="toggleHoveringTop(true)"
      @drop.prevent.stop="onDrop($event, parentId, 'over', index); toggleHoveringTop(false)"
      class="item-hover-mask item-top-mask"
      :class="itemTypeClass">

      <div
        v-show="hoveringTop"
        class="drop-indicator drop-indicator-top">
      </div>
    </div>

    <!-- Bottom hover-mask. -->
    <div
      v-show="dragMode"
      @dragleave="toggleHoveringBottom(false)"
      @dragenter="toggleHoveringBottom(true)"
      @drop.stop.prevent="onDrop($event, parentId, 'under', index); toggleHoveringBottom(false)"
      class="item-hover-mask item-bottom-mask"
      :class="itemTypeClass">

      <div
        v-show="hoveringBottom"
        class="drop-indicator drop-indicator-bottom">
      </div>
    </div>

    <!-- Bookmark element, if this node is a bookmark. -->
    <div
      v-if="node.Type === 'Bookmark'"
      draggable="true"
      class="node item item-padding"
      @dragstart="startDrag($event, node)">

      <span><div class="favicon-placeholder"></div></span>
      <span style="color: orange">{{ node.Id }}</span>
      <span style="color: green">[{{ index }}]</span>
      <span>{{ node.Title.toLowerCase() }}</span>
    </div>

    <!--
      Folder element, if this node is a folder.
      This top-most element functions as a container for the folder-children.
    -->
    <div
      v-else-if="node.Type === 'Folder'"
      class="node folder drop-zone"
      :class="{ 'folder-padding': showChildren }"
      @dragleave="rmBackgroundColor"
      @dragenter="setBackgroundColor"
      @drop.stop.prevent="onDrop($event, node.Id); rmBackgroundColor($event)">

      <!-- The node-part of this node, functions as a header when the folder is opened. -->
      <div
        draggable="true"
        class="item"
        :class="showChildren ? 'folder-open' : 'item-padding'"
        @click="toggleChildren"
        @dragenter="toggleChildrenOn($event, node)"
        @dragstart="startDrag($event, node)">

        <img :src="childrenToggledIcon" v-if="hasChildren" />
        <span style="color: orange">{{ node.Id }}</span>
        <span style="color: green">[{{ index }}]</span>
        <span>{{ node.Title.toLowerCase() }}</span>
      </div>

      <!-- Recurse the children if this node is a folder. -->
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
div.bookmark-mask { height: 50%; }
div.folder-mask { height: 5px; }

div.item-top-mask { top: 0; }
div.item-bottom-mask { bottom: 0; }

div.item-padding { padding: 5px 9px; }
div.folder-padding { padding: 2px; }

div.folder { background-color: hsla(248deg, 13%, 36%, 0.3); }
div.folder-open { padding: 3px 7px; }

/* 'dragover' style applied from 'MoveTreeItem.js' */
div.drop-zone.dragover { background-color: var(--rp-highlight-high); }

/* Apply some margin to the children of folders. */
div.child { margin-left: 20px; }

div.wrapper {
  position: relative;
  padding: 3px;
}

div.item-hover-mask {
  position: absolute;
  width: 100%;
}

div.drop-indicator {
  content: "";
  position: absolute;
  left: 0;
  height: 4px;
  width: 40px;
  background-color: purple;
}

div.drop-indicator-top {
  top: 0;
  margin-top: -2px;
}

div.drop-indicator-bottom {
  bottom: 0;
  margin-bottom: -2px;
}

div.node {
  border-radius: 7px;
  font-family: var(--bks-big-text);
  cursor: default;
  transition: background-color 0.1s ease;
}

div.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
  background-color: var(--rp-highlight-low);
}

div.favicon-placeholder {
  width: 18px;
  height: 18px;
}

@media (hover:hover) {
    div.item:hover {
    color: var(--rp-iris);
    cursor: default;
  }
}
</style>
