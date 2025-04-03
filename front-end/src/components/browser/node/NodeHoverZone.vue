<!-- NOTE: NodeHoverZone.vue -->

<script setup>
import { ref } from 'vue';
import {
  dragMode,
  onDrop,
  hoveringFolder,
} from '../BrowserMoveTreeItem.js';


const props = defineProps({
  type: {
    type: Object,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  parentId: {
    type: Number,
    required: true
  }
});


const emit = defineEmits(['showChildren']);


const hovering = ref({
  item: false,
  top: false,
  bottom: false,
  closedFolder: computed(() => dragMode.value && props.type === 'Folder')
})


let timoutId;
function toggleChildrenDelay(event, nodeId) {
  const itemId = Number(event.dataTransfer.getData('itemID'));
  if (itemId == nodeId) return;
  hoveringFolder.value = nodeId;
  timeoutId = setTimeout(() => {
    if (hoveringFolder.value == nodeId && dragMode) {
      emit('showChildren', true);
    }
    hoveringFolder.value = null;
    timoutId = undefined;
  }, 500);
};


function cancelToggleChildrenDelay() {
  hoveringFolder.value = null;
  clearTimeout(timoutId);
}


const topBottomMaskClass = computed(() => {
  'bookmark-mask': props.type === 'Bookmark',
  'folder-mask': props.type === 'Folder'
});
</script>


<template>
  <div class="hover-mask">

    <!-- Top. -->
    <div
      @dragenter.stop="hovering.top = true"
      @dragleave.stop="hovering.top = false"
      @drop.prevent.stop="onDrop($event, parentId, id, 'over');
        hovering.top = false;"
      :class="topBottomMaskClass"
      class="top-mask">

      <div
        v-show="hovering.top"
        class="drop-indicator drop-indicator-top">
      </div>
    </div>

    <!-- Middle folder hover-mask (for hover-to-open) -->
    <div
      v-if="type === 'Folder'"
      @dragenter.stop="toggleChildrenDelay($event, id)"
      @dragleave.stop="cancelToggleChildrenDelay()"
      @drop.prevent.stop="onDrop($event, id)"
      class="folder-hover-to-open-mask" >
    </div>

    <!-- Bottom. -->
    <div
      v-show="dragMode"
      @dragenter.stop="hovering.bottom = true"
      @dragleave.stop="hovering.bottom = false"
      @drop.prevent.stop="onDrop($event, parentId, id, 'under')
        hovering.bottom = false;"
      :class="topBottomMaskClass"
      class="bottom-mask">

      <div
        v-show="hovering.bottom"
        class="drop-indicator drop-indicator-bottom">
      </div>
    </div>
  </div>
</template>


<style scoped>
div.hover-mask {
  background-color: gray;
  opacity: 0.2;

  position: absolute;
  height: 100%;
  width: 100%;
}

div.top-mask {
  background-color: green;
  opacity: 0.2;

  top: 0;
}

div.bottom-mask {
  background-color: blue;
  opacity: 0.2;

  bottom: 0;
}

div.bookmark-mask { height: 50%; }
div.folder-mask { height: 5px; }

div.folder-hover-to-open-mask {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 10px;
}
</style>
