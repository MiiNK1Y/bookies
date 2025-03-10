<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  spacing: {
    type: Number,
    default: 0
  }
});

const showChildren = ref(false);

const nodeMargin = computed(() => {
  return { 'margin-left': `${props.spacing}px` }
});

const hasChildren = computed(() => {
  const { Bookmarks } = props.node;
  return Bookmarks && Bookmarks.length > 0;
});

const toggleChildrenIcon = computed(() => {
  const pointRight = "/src/assets/icons/point_right.svg";
  const pointDown = "/src/assets/icons/point_down.svg";
  return props.showChildren ? pointDown : pointRight;
});

function toggleChildren() {
  showChildren.value = !showChildren.value;
}
</script>


<template>
  <div class="node" :style="nodeMargin">
    <img
      :src="toggleChildrenIcon"
      v-if="hasChildren"
      @click="toggleChildren"
      @keypress="toggleChildren"
    />
    <span>{{ node.Title }}</span>
  </div>
  <div v-if='hasChildren' v-show="showChildren">
    <TreeNode
      v-for="child in node.Bookmarks"
      :key="child.id"
      :node="child"
      :spacing="spacing + 20"
    />
  </div>
</template>


<style scoped>
div.node {
  height: fit-content;
  width: fit-content;
  padding: 5px 9px;
  border-radius: 5px;
  margin: 5px;
  background-color: var(--rp-highlight-med);
}
</style>
