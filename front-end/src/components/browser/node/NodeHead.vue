<!-- NOTE: NodeHead.vue -->

<script setup>
import { ref, computed } from 'vue';
import { startDrag, onDragEnd } from '../BrowserMoveTreeItem.js';
import { stateRefs } from '@/stores/folderTree.js';


const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  showingChildren: {
    type: Boolean,
    required: true
  }
});


const hovering = ref(false);


function selectThisNode() {
  stateRefs.value.selectedItem = props.node.Id;
  hovering.value = false;
}


const thisNodeIsSelected = computed(() =>
  stateRefs.value.selectedItem == props.node.Id
);


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
    @mouseover="hovering = true"
    @mouseleave="hovering = false"
    @dragstart="startDrag($event, node)"
    @dragend="onDragEnd($event)"
    @click="selectThisNode()"
    :class="{ 'inactive-hover': hovering && !thisNodeIsSelected }"
    draggable="true"
    class="wrapper" >

      <slot name="icon">
        <div class="favicon-placeholder"></div>
      </slot>

      <div class="id">
        <slot name="id"></slot>
      </div>

      <div class="index">
        [<slot name="index"></slot>]
      </div>

      <slot name="title"></slot>

  </div>
</template>


<style scoped>
div.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 5px 9px;
  background-color: var(--rp-highlight-low);
  user-select: none;
}

div.favicon-placeholder {
  width: 18px;
  height: 18px;
}

div.id {
  color: orange;
}

div.index {
  color: green;
}

div.inactive-hover {
  background-color: var(--ct-surface_0);
  color: var(--rp-iris);
  cursor: default;
}

div.folder-open {
  padding: 3px 7px;
}
</style>
