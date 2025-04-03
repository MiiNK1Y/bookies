<!-- NOTE: NodeHead.vue -->

<script setup>
import { startDrag, onDragEnd } from '../BrowserMoveTreeItem.js';


const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  open: {
    type: Boolean,
    required: true,
    default: false
  }
});


function selectThisNode() {
  stateRefs.value.selectedItem = props.node.Id;
  hovering.value.item = false;
}


const style = ref({
  type: props.node.Type === 'Bookmark' ? 'bookmark-mask' : 'folder-mask',
  folder: computed(() => children.value.show ? 'folder-open' : 'item-padding'),
  hover: computed(() => hovering.value.item ? 'inactive-hover' : ''),
  selected: computed(() => stateRefs.value.selectedItem == props.node.Id ? 'selected-item' : '')
});


const nodeStyle = () => {
  if (node.Type === 'Bookmark') {
    return [style.selected, style.hover];
  } else if (node.Type === 'Folder') {
    return [style.folder, style.selected, style.hover];
  }
};
</script>


<template>
  <div
    @dragstart="startDrag($event, node)"
    @dragend="onDragEnd($event)"
    @click="selectThisNode()"
    :class="nodeStyle"
    draggable="true" >

      <slot name="icon">
        <div class="favicon-placeholder"></div>
      </slot>

      <span class="id">
        [<slot name="id"></slot>]
      </span>

      <span class="index">
        [<slot name="index"></slot>]
      </span>

      <span class="title">
        <slot name="title"></slot>
      </span>
  </div>
</template>


<style scoped>
div.favicon-placeholder {
  width: 18px;
  height: 18px;
}

div.prevent-select {
  user-select: none;
}
</style>
