<script setup>
import { ref, computed } from 'vue';
import { startDrag, onDragEnd } from '../BrowserMoveTreeItem.js';
import { stateRefs } from '@/lib/folderTree.js';


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


function select() {
  stateRefs.value.selectedItem = props.node.Id;
}


const style = computed(() => ({
  'head__folder-open-padding': props.showingChildren,
  'head__hovering': hovering.value &&
    stateRefs.value.selectedItem != props.node.Id,
  'head__selected': stateRefs.value.selectedItem == props.node.Id
}));
</script>


<template>
  <div
    @mouseover="hovering = true"
    @mouseleave="hovering = false"
    @dragstart="startDrag($event, node)"
    @dragend="onDragEnd($event)"
    @click="select()"
    :class="style"
    class="head__wrapper"
    draggable="true" >

      <slot name="icon">
        <div class="head__favicon-placeholder"></div>
      </slot>

      <div class="head__id">
        <slot name="id"></slot>
      </div>

      <div class="head__index">
        [<slot name="index"></slot>]
      </div>

      <slot name="title"></slot>

  </div>
</template>


<style scoped>
div.head__wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 3px 6px;
  background-color: var(--rp-highlight-low);
  font-family: var(--bks-big-text);
  cursor: default;
  user-select: none;
}

div.head__favicon-placeholder {
  width: 18px;
  height: 18px;
}

div.head__id {
  color: orange;
}

div.head__index {
  color: green;
}

div.head__selected {
  border: 2px solid var(--ct-lavender);
}

div.head__hovering {
  color: var(--rp-iris);
  background-color: var(--ct-surface_0);
  cursor: default;
}

div.head__folder-open-padding {
  padding: 1px 4px;
}
</style>
