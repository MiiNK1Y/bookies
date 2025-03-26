<script setup>
import { ref, computed } from 'vue';
import { dragMode, startDrag, onDrop, onPositionDrop,
setBackgroundColor, rmBackgroundColor } from './MoveTreeItem.js';

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

const topHoveringMaskClass = props.node.Type === 'Bookmark'
  ? ['bookmarkMask', 'topBookmarkMask'] : ['folderMask', 'topFolderMask'];

const bottomHoveringMaskClass = props.node.Type === 'Bookmark'
  ? ['bookmarkMask', 'bottomBookmarkMask'] : ['folderMask', 'bottomFolderMask'];

const hoveringMaskPosition = computed(() => {
  return { toggleHoveringTop: hoveringTop, toggleHoveringBottom: hoveringBottom }
})

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
      @drop.prevent.stop="onPositionDrop($event, parentId, 'over', index); toggleHoveringTop(false)"
      class="itemHoverMask "
      :class="topHoveringMaskClass">

      <div
        v-show="hoveringTop"
        class="dropIndicator dropIndicatorTop">
      </div>
    </div>

    <!-- Bottom hover-mask. -->
    <div
      v-show="dragMode"
      @dragleave="toggleHoveringBottom(false)"
      @dragenter="toggleHoveringBottom(true)"
      @drop.stop.prevent="onPositionDrop($event, parentId, 'under', index); toggleHoveringBottom(false)"
      class="itemHoverMask"
      :class="bottomHoveringMaskClass">

      <div
        v-show="hoveringBottom"
        class="dropIndicator dropIndicatorBottom">
      </div>
    </div>

    <!-- Bookmark element, if this node is a bookmark. -->
    <div
      v-if="node.Type === 'Bookmark'"
      draggable="true"
      class="node item itemPadding"
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
      :class="{ folderPadding: showChildren }"
      @dragleave="rmBackgroundColor"
      @dragenter="setBackgroundColor"
      @drop.stop.prevent="onDrop($event, node.Id); rmBackgroundColor($event)">

      <!-- The node-part of this node, functions as a header when the folder is opened. -->
      <div
        draggable="true"
        class="item"
        :class="showChildren ? 'folderOpen' : 'itemPadding'"
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
div.wrapper {
  position: relative;
  padding: 3px;
}

div.itemHoverMask {
  position: absolute;
  width: 100%;
}

div.bookmarkMask { height: 50%; }
div.folderMask { height: 5px; }
div.topBookmarkMask { top: 0; }
div.bottomBookmarkMask { bottom: 0; }

div.dropIndicator {
  content: "";
  position: absolute;
  left: 0;
  height: 4px;
  width: 40px;
  background-color: purple;
}

div.dropIndicatorTop {
  top: 0;
  margin-top: -2px;
}

div.dropIndicatorBottom {
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

div.itemPadding { padding: 5px 9px; }
div.folder { background-color: hsla(248deg, 13%, 36%, 0.3); }
div.folderOpen { padding: 3px 7px; }
div.folderPadding { padding: 2px; }

/* 'dragover' style applied from 'MoveTreeItem.js' */
div.drop-zone.dragover { background-color: var(--rp-highlight-high); }

/* Apply some margin to the children of folders. */
div.child { margin-left: 20px; }

div.item:hover {
  color: var(--rp-iris);
  cursor: default;
}
</style>
