<!-- NOTE: Node.vue -->

<script setup>
import NodeHead from './NodeHead.vue';
import NodeHoverZone from './NodeHoverZone.vue';


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


const children = ref({
  show: false,
  exists: computed(() => props.node.Bookmarks),
  icon: computed(() => children.value.show
    ? "/src/assets/icons/folder-open-solid.svg"
    : "/src/assets/icons/folder-solid.svg"
  )
});


const icon = computed(() =>
  props.open
    ? "/src/assets/icons/folder-solid.svg"
    : "/src/assets/icons/folder-open-solid.svg"
);


function toggleShowChildren(bool) {
  children.value.show = true;
}
</script>


<template>
  <div class="wrapper">
    <NodeHoverZone
      :type="node.Type"
      @show-children="toggleShowChildren" />

    <!-- Bookmark. -->
    <NodeHead
      v-if="node.Type === 'Bookmark'"
      :type="Bookmark" >
      <template #icon>{{ icon }}</template>
      <template #id></template>
      <template #index></template>
      <template #title></template>
    </NodeHead>

    <!-- Folder. -->
    <div
      v-else-if="node.Type === 'Folder'"
      @dragover.prevent
      @dragenter.prevent.stop=""
      @dragleave.prevent.stop=""
      @drop.prevent.stop=""
      :class=""
      class="" >

      <NodeHead
        :type="Folder" >
        <template #icon></template>
        <template #id></template>
        <template #index></template>
        <template #title></template>
      </NodeHead>

      <Node
        v-show="enableTree && children.show"
        v-for="(child, index) in node.Bookmark"
        :key="child.Id"
        :node="child"
        :index="index"
        :parentId="node.Id"
        :enableTree
        class="child" />
    </div>
  </div">
</template>


<style scoped>
div.child { margin-left: 20px; }
</style>
