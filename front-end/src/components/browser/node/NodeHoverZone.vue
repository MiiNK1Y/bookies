<!-- NOTE: NodeHoverZone.vue -->

<script setup>
import { ref, computed } from 'vue';
import {
  dragMode,
  onDrop,
  hoveringFolder,
} from '../BrowserMoveTreeItem.js';


const props = defineProps({
  type: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  parentId: {
    type: Number,
    required: true
  },
  showChildren: {
    type: Boolean,
    required: true
  }
});


const emit = defineEmits(['showChildren']);


const hovering = ref({
  top: false,
  bottom: false,
  closedFolder: computed(() =>
    dragMode.value && props.type === 'Folder' && !props.showChildren
  )
})


let timoutId;
function toggleChildrenDelay(event, nodeId) {
  const itemId = Number(event.dataTransfer.getData('itemID'));
  if (itemId == nodeId) return;
  hoveringFolder.value = nodeId;
  timeoutId = setTimeout(() => {
    if (hoveringFolder.value == nodeId && dragMode.value) {
      emit('showChildren');
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
  return {
    'bookmark-mask': props.type === 'Bookmark',
    'folder-mask': props.type === 'Folder'
  }
});
</script>


<template>
  <div class="mask-wrapper">
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
        v-show="hovering.closedFolder"
        @dragenter.stop="toggleChildrenDelay($event, id)"
        @dragleave.stop="cancelToggleChildrenDelay()"
        @drop.prevent.stop="onDrop($event, id)"
        class="folder-hover-to-open-mask" >
      </div>

      <!-- Bottom. -->
      <div
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
  </div>
</template>


<style scoped>
div.mask-wrapper {
  z-index: 10;
  position: absolute;
  height: 100%;
  width: 100%;
  margin-left: -3px;
  margin-top: -3px;
}

div.hover-mask {
  position: relative;
  height: 100%;
  width: 100%;
}

div.bookmark-mask {
  height: 50%;
  width: 100%;
}

div.folder-mask {
  height: 5px;
  width: 100%;
}

div.top-mask {
  position: absolute;
  top: 0;

  background-color: green;
  opacity: 0.3;
}

div.bottom-mask {
  position: absolute;
  bottom: 0;

  background-color: blue;
  opacity: 0.3;
}

div.folder-hover-to-open-mask {
  width: 100%;
  position: absolute;
  top: 5px;
  bottom: 5px;

  background-color: white;
  opacity: 0.3;
}
</style>
