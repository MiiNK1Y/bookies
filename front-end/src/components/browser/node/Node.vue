<script setup>
import { ref, computed } from 'vue';

import NodeHead from './NodeHead.vue';
import NodeHoverZone from './NodeHoverZone.vue';

import { setBackgroundColor, rmBackgroundColor, onDrop } from '@/components/browser/BrowserMoveTreeItem.js';
import { state } from '@/stores/bookies.js';


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
    type: Number,
    required: true
  },
  enableTree: {
    type: Boolean,
    required: false,
    default: false
  }
});


const draggingNodeHead = ref(false);


const children = ref({
  show: false,
  icon: computed(() => children.value.show
    ? "/src/assets/icons/folder-open-solid.svg"
    : "/src/assets/icons/folder-solid.svg"
  )
});
</script>


<template>
  <div
    class="wrapper"
    :class="{ 'dragging': draggingNodeHead }">

    <NodeHoverZone
      v-show="state.dragging"
      :type="node.Type"
      :nodeId="node.Id"
      :parentId="parentId"
      :showChildren="children.show"
      @show-children="children.show = true"
    />

    <!-- Bookmark. -->
    <NodeHead
      v-if="node.Type === 'Bookmark'"
      :node="node"
      :showingChildren="children.show"
      @dragging="draggingNodeHead = true"
      @not-dragging="draggingNodeHead = false" >

      <template #icon>
        <img
          src="/src/assets/icons/arrow-up-right-from-square-solid.svg"
          draggable="false"
        />
      </template>
      <template #id>{{ node.Id }}</template>
      <template #index>{{ index }}</template>
      <template #title>{{ node.Title }}</template>
    </NodeHead>

    <!-- Folder. -->
    <div
      v-else-if="node.Type === 'Folder'"
      @dragenter="setBackgroundColor($event)"
      @dragleave="rmBackgroundColor($event)"
      @drop.prevent.stop="onDrop($event, node.Id);
        rmBackgroundColor($event);"
      :class="{ 'folder-padding': children.show }"
      class="folder drop-zone" >

      <NodeHead
        :node="node"
        :showingChildren="children.show"
        @dragging="draggingNodeHead = true"
        @not-dragging="draggingNodeHead = false" >

        <template #icon>
          <!--
            TODO:
            Currently, clicking the folder icon when the tree is disabled \
            does not pass the event to the node itself (since bubbling is stopped).
            Fix it so that the event is bubbling to the node and the node is selected.
          -->
          <img
            @click.stop="children.show = !children.show ? enableTree : false"
            :src="children.icon"
            draggable="false"
          />
        </template>
        <template #id>{{ node.Id }}</template>
        <template #index>{{ index }}</template>
        <template #title>{{ node.Title }}</template>
      </NodeHead>

      <div
        v-show="enableTree && children.show"
        class="children" >

        <Node
          v-for="(child, index) in node.Bookmarks"
          :key="child.Id"
          :node="child"
          :index="index"
          :parentId="node.Id"
          :enableTree />
      </div>
    </div>
  </div>
</template>


<style scoped>
div.wrapper {
  position: relative;
  padding: 3px 3px 3px 0;
}

div.folder {
  border-radius: 7px;
  background-color: hsla(248deg, 13%, 36%, 0.3);
}

div.folder-padding {
  padding: 2px;
}

/* 'dragover' style applied from 'MoveTreeItem.js' */
div.drop-zone.dragover {
  background-color: rgba(0,0,0,0.3) !important;
  border: 2px solid var(--ct-red);
  padding: 0 !important;
}

div.children {
  padding-top: 3px;
  margin-left: 20px;
}

div.wrapper.dragging {
  opacity: 0.3;
}
</style>
