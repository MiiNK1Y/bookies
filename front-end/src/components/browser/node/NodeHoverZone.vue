<script setup>
import { ref, computed } from 'vue';

import { onDrop } from '@/components/browser/BrowserMoveTreeItem.js';
import { state } from '@/stores/bookies.js';


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
    state.value.dragging && props.type === 'Folder' && !props.showChildren
  )
})


let timeoutId;
function toggleChildrenDelay(event, nodeId) {
  const itemId = Number(event.dataTransfer.getData('itemID'));

  console.log("hovering");

  if (itemId == nodeId) return;

  state.value.hovering.folder = nodeId;
  timeoutId = setTimeout(() => {
    if (state.value.hovering.folder == nodeId && state.value.dragging) {
      emit('showChildren');
    }
    state.value.hovering.folder = null;
    timeoutId = undefined;
  }, 500);
};


function cancelToggleChildrenDelay() {
  state.value.hovering.folder = null;
  clearTimeout(timeoutId);
}


const topBottomMaskClass = {
    'bookmark-mask': props.type === 'Bookmark',
    'folder-mask': props.type === 'Folder'
};


const dropIndicatorPositionClass = computed(() => ({
    'drop-indicator-top': hovering.value.top,
    'drop-indicator-bottom': hovering.value.bottom
}));
</script>


<template>
  <div>

    <!-- Drop-indicator -->
    <div
      v-show="hovering.top || hovering.bottom"
      :class="dropIndicatorPositionClass"
      class="drop-indicator" >
    </div>

    <!-- Top mask. -->
    <div
      @dragenter.stop="hovering.top = true"
      @dragleave.stop="hovering.top = false"
      @drop.prevent.stop="onDrop($event, parentId, nodeId, 'over');
        hovering.top = false;"
      :class="topBottomMaskClass"
      class="mask top-mask" >
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

    <!-- Bottom mask. -->
    <div
      @dragenter.stop="hovering.bottom = true"
      @dragleave.stop="hovering.bottom = false"
      @drop.prevent.stop="onDrop($event, parentId, nodeId, 'under');
        hovering.bottom = false;"
      :class="topBottomMaskClass"
      class="mask bottom-mask" >
    </div>

  </div>
</template>


<style scoped>
div.mask {
  z-index: 2;
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
  z-index: 1;
  position: absolute;
  left: 0;
  height: 4px;
  width: 40px;
  border-radius: 1em;
  margin-left: -3px;
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
</style>
