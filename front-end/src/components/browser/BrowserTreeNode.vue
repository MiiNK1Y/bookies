<script setup>
import { ref, computed } from 'vue';
import { stateRefs } from '@/stores/folderTree.js';
import { dragMode, startDrag, onDragEnd, onDrop, setBackgroundColor,
rmBackgroundColor, hoveringFolder } from './BrowserMoveTreeItem.js';

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
    type: [Number, null],
  }
});

const hoveringTop = ref(false);
const hoveringBottom = ref(false);
const showChildren = ref(false);

const hasChildren = computed(() => props.node.Bookmarks );
const itemTypeClass = props.node.Type === 'Bookmark' ? 'bookmark-mask' : 'folder-mask';

const showOpenFolderHoverZone = computed(() =>
  dragMode.value && props.node.Type === 'Folder' && !showChildren.value
);

const childrenToggledIcon = computed(() =>
  showChildren.value
    ? "/src/assets/icons/folder-open-solid.svg"
    : "/src/assets/icons/folder-solid.svg"
);

let timeoutID;
function delayedToggleChildrenOn(event, item) {

  const itemId = Number(event.dataTransfer.getData("itemID"));
  if (itemId == item.Id) return;

  hoveringFolder.value = item.Id;

  timeoutID = setTimeout(() => {
    if (hoveringFolder.value == item.Id && dragMode) showChildren.value = true;
    hoveringFolder.value = null;
  }, 500);
}

function cancelDelayedToggleChildrenOn() {
  hoveringFolder.value = null;
  clearTimeout(timeoutID);
}

const folderNodeClass = computed(() => {
  return [
    showChildren.value ? 'folder-open' : 'item-padding',
    stateRefs.selectedItem == props.node.Id ? 'selected-item' : ''
  ]
})
</script>


<template>
  <!-- Wrapping container for entire node. -->
  <div
    class="wrapper">

    <!-- Top hover-mask. -->
    <div
      v-show="dragMode"
      @dragenter.stop="hoveringTop = true"
      @dragleave.stop="hoveringTop = false"
      @drop.prevent.stop="onDrop($event, parentId, node.Id, 'over'); hoveringTop = false;"
      class="item-hover-mask item-top-mask"
      :class="itemTypeClass">

      <div
        v-show="hoveringTop"
        class="drop-indicator drop-indicator-top">
      </div>
    </div>

    <!-- Dedicated hover-to-open zone for folders. -->
    <div
      v-show="showOpenFolderHoverZone"
      class="item-hover-mask folder-hover-to-open"
      @dragenter.stop="delayedToggleChildrenOn($event, node)"
      @dragleave.stop="cancelDelayedToggleChildrenOn()"
      @drop.prevent.stop="onDrop($event, node.Id)">
    </div>

    <!-- Bottom hover-mask. -->
    <div
      v-show="dragMode"
      @dragenter.stop="hoveringBottom = true"
      @dragleave.stop="hoveringBottom = false"
      @drop.prevent.stop="onDrop($event, parentId, node.Id, 'under'); hoveringBottom = false;"
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
      class="node item item-padding prevent-select"
      :class="{ 'selected-item': stateRefs.selectedItem == node.Id }"
      @click="stateRefs.selectedItem = node.Id"
      @dragstart="startDrag($event, node)"
      @dragend="onDragEnd($event)">

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
      class="node folder drop-zone prevent-select"
      :class="{ 'folder-padding': showChildren }"
      @dragover.prevent
      @dragenter.prevent.stop="setBackgroundColor($event)"
      @dragleave.prevent.stop="rmBackgroundColor($event)"
      @drop.prevent.stop="onDrop($event, node.Id); rmBackgroundColor($event)">

      <!-- The node-part of this node, functions as a header when the folder is opened. -->
      <div
        draggable="true"
        class="item prevent-select"
        :class="[folderNodeClass, stateRefs.selectedItem == node.Id ? 'selected-item' : '']"
        @click="stateRefs.selectedItem = node.Id"
        @dragstart="startDrag($event, node)"
        @dragend="onDragEnd($event)">

        <img
          draggable="false"
          @click="showChildren = !showChildren"
          :src="childrenToggledIcon"
          v-if="hasChildren"
        />
        <span style="color: orange">{{ node.Id }}</span>
        <span style="color: green">[{{ index }}]</span>
        <span>{{ node.Title.toLowerCase() }}</span>
      </div>

      <!-- Recurse the children if this node is a folder. -->
      <BrowserTreeNode
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

div.folder-hover-to-open {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 70%;
}

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
}

div.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
  background-color: var(--rp-highlight-low);
}

div.selected-item {
  background-color: var(--rp-highlight-med);
}

div.favicon-placeholder {
  width: 18px;
  height: 18px;
}

div.prevent-select {
  user-select: none;
}

@media (hover:hover) {
    div.item:hover {
    background-color: var(--ct-surface_0);
    color: var(--rp-iris);
    cursor: default;
  }
}
</style>