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
  nodeId: {
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


let timeoutId;
function toggleChildrenDelay(event, nodeId) {
  const itemId = Number(event.dataTransfer.getData('itemID'));
  if (itemId == nodeId) return;
  hoveringFolder.value = nodeId;
  timeoutId = setTimeout(() => {
    if (hoveringFolder.value == nodeId && dragMode.value) {
      emit('showChildren');
    }
    hoveringFolder.value = null;
    timeoutId = undefined;
  }, 500);
};


function cancelToggleChildrenDelay() {
  hoveringFolder.value = null;
  clearTimeout(timeoutId);
}


const topBottomMaskClass = computed(() => {
  return {
    'bookmark-mask': props.type === 'Bookmark',
    'folder-mask': props.type === 'Folder'
  }
});
</script>


<template>
  <div>
    <!-- Top. -->
    <div
      @dragenter.stop="hovering.top = true"
      @dragleave.stop="hovering.top = false"
      @drop.prevent.stop="onDrop($event, parentId, nodeId, 'over');
        hovering.top = false;"
      :class="topBottomMaskClass"
      class="mask top-mask">

      <div
        v-show="hovering.top"
        class="drop-indicator drop-indicator-top">
      </div>
    </div>

    <!-- Middle folder hover-mask (for hover-to-open) -->
    <div
      v-if="type === 'Folder'"
      v-show="hovering.closedFolder"
      @dragenter.stop="toggleChildrenDelay($event, nodeId)"
      @dragleave.stop="cancelToggleChildrenDelay()"
      @drop.prevent.stop="onDrop($event, nodeId)"
      class="mask folder-hover-to-open-mask" >
    </div>

    <!-- Bottom. -->
    <div
      @dragenter.stop="hovering.bottom = true"
      @dragleave.stop="hovering.bottom = false"
      @drop.prevent.stop="onDrop($event, parentId, nodeId, 'under');
        hovering.bottom = false;"
      :class="topBottomMaskClass"
      class="mask bottom-mask">

      <div
        v-show="hovering.bottom"
        class="drop-indicator drop-indicator-bottom">
      </div>
    </div>
  </div>
</template>


<style scoped>
div.mask {
  position: absolute;
  width: 100%;
}

div.bookmark-mask {
  height: 50%;
}

div.folder-mask {
  height: 10px;
}

div.top-mask {
  top: 0;
}

div.bottom-mask {
  bottom: 0;
}

div.folder-hover-to-open-mask {
  top: 10px;
  bottom: 10px;
}

div.drop-indicator {
  position: absolute;
  left: 0;
  height: 4px;
  width: 40px;
  border-radius: 1em;
  background-color: var(--ct-red);
}

div.drop-indicator-top {
  top: 0;
  margin-top: -2px;
}

div.drop-indicator-bottom {
  bottom: 0;
  margin-bottom: -2px;
}


/* Colors for visual aid and debugging. */
/*
.top-mask,
.bottom-mask,
.folder-hover-to-open-mask {
  opacity: 0.3;
}

.top-mask {
  background-color: green;
}

.bottom-mask {
  background-color: blue;
}

.folder-hover-to-open-mask {
  background-color: white;
}
*/
</style>
