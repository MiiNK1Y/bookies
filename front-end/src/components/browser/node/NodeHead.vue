<script setup>
import { ref, computed } from 'vue';

import { startDrag, onDragEnd } from '@/components/browser/BrowserMoveTreeItem.js';
import { state, bookies } from '@/stores/bookies.js';
import { debugState } from '@/stores/settings.js';
import { FlatParent } from '@/lib/bookies/rebuild.js';


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


function goToUrl() {
  if (props.node.Type === "Bookmark") {
    window.open(props.node.URL, '_blank');
  }
}


// set state of what folder to go to,
//
// this should also set some "currently viewing" argument in the url-field:
// i.e '/browser/bookmarks_&v=some-folder'
// set the whole bookies as the default view when visiting, then navigate from there.
//
// remember to rebuild the partial parent when items are moved in and out.
function goToFolder() {
  const flatNode = bookies.flat.find((a) => a.Id === props.node.Id);
  const thisParent = new FlatParent(flatNode, bookies.flat);

  // Set the rebuilt parent as the currently viewing item in the bookmarks view.
  state.value.showing = thisParent.parent;
}


const nodeHeadClass = computed(() => {
  const showingChildren = props.showingChildren;
  const selectedItem = state.value.selected;
  const notSelected = !selectedItem || state.value.selected.Id != props.node.Id;
  const hoverNonSelected = hovering.value && notSelected;
  const nodeSelected = selectedItem && state.value.selected.Id == props.node.Id;
  const isLastMoved = state.value.lastMoved === props.node.Id;

  return {
    'head__folder-open-padding': showingChildren,
    'head__hovering': hoverNonSelected,
    'head__selected': nodeSelected,
    'flash': isLastMoved && !state.value.dragging
  };
});
</script>


<template>
  <div
    @mouseover="hovering = state.lastMoved === node.Id ? false : true"
    @mouseleave="hovering = false"
    @dragstart="startDrag($event, node); $emit('dragging')"
    @dragend="onDragEnd($event); $emit('notDragging');"
    @click="state.selected = node"
    @dblclick="node.Type == 'Bookmark' ? goToUrl() : goToFolder()"
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

@keyframes flash {
  0% {
    background-color: var(--rp-highlight-med);
  }
  50% {
    background-color: var(--rp-highlight-high);
  }
  100% {
    background-color: var(--rp-highlight-med);
  }
}

div.head__wrapper.flash {
  animation-name: flash;
  animation-duration: 0.2s;
  animation-iteration-count: 2;
}
</style>
