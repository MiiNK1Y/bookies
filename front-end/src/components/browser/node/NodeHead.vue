<script setup>
import { ref, computed } from 'vue';

import { startDrag, onDragEnd } from '@/components/browser/BrowserMoveTreeItem.js';
import { state } from '@/stores/bookies.js';
import { debugState } from '@/stores/settings.js';


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
  state.value.selected = {...props.node};
}

function goToUrl() {
  if (props.node.Type === "Bookmark") {
    window.open(props.node.URL, '_blank');
  }
}


const nodeHeadClass = computed(() => ({
  'head__folder-open-padding': props.showingChildren,
  'head__hovering': hovering.value && (
    !state.value.selected || state.value.selected.Id != props.node.Id
  ),
  'head__selected': state.value.selected && state.value.selected.Id == props.node.Id
}));
</script>


<template>
  <div
    @mouseover="hovering = true"
    @mouseleave="hovering = false"
    @dragstart="startDrag($event, node)"
    @dragend="onDragEnd($event)"
    @click="select()"
    @dblclick="goToUrl()"
    :class="nodeHeadClass"
    class="head__wrapper"
    draggable="true" >

      <slot name="icon">
        <div class="head__favicon-placeholder"></div>
      </slot>

      <div v-if="debugState.showNodeId" class="head__id">
        <slot name="id"></slot>
      </div>

      <div v-if="debugState.showNodeIndex" class="head__index">
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
