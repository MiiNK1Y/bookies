<!-- NOTE: NodeWrapper.vue -->

<script setup>
import NodeHead from './NodeHead.vue';
import NodeHoverZone from './NodeHoverZone.vue';

const props = defineProps({
  node: {
    type: Object, required: true
  },
  index: {
    type: Number, required: true
  },
  parentId: {
    type: Number, required: true
  },
  enableTree: {
    type: Boolean, required: false, default: false
  }
});

const children = ref({
  show: false,
  exists: computed(() => props.node.Bookmarks),
  icon: computed(() => children.value.show
    ? "/src/assets/icons/folder-open-solid.svg"
    : "/src/assets/icons/folder-solid.svg"
  )
});
</script>

<template>
  <div class="wrapper">
    <NodeHoverZone :node="node.Type" :position="top" />
    <NodeHoverZone :node="node.Type" :position="middle" />
    <NodeHoverZone :node="node.Type" :position="bottom" />

    <!-- Bookmark. -->
    <div
      v-if="node.Type === 'Bookmark'"
      @mouseover=""
      @mouseleave=""
      @click=""
      @dragstart=""
      @dragend=""
      :class=""
      draggable="true"
      class="" >

      <NodeHead :type="bookmark" />
    </div>

    <!-- Folder. -->
    <!-- The container that wrappes the children of this node. -->
    <div
      v-else-if="node.Type === 'Folder'"
      @dragover.prevent
      @dragenter.prevent.stop=""
      @dragleave.prevent.stop=""
      @drop.prevent.stop=""
      :class=""
      class="" >

      <!-- The node, functions as a header when the folder is opened. -->
      <div
        draggable="true"
        class=""
        :class=""
        @mouseover=""
        @mouseleave=""
        @click=""
        @dragstart=""
        @dragend="">

        <NodeHead :type="folder" />
      </div>

      <!-- Recurse the children if this node is a folder. -->
      <BrowserNode
        v-show=""
        v-for=""
        :key=""
        :node=""
        :parentId=""
        :enableChildren="true"
        :index=""
        class="" />
    </div>
  </div">
</template>
