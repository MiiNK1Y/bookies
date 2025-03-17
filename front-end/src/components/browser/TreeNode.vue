<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  spacing: {
    type: Number,
    default: 10
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
  const pointRight = "/src/assets/icons/folder.svg";
  const pointDown = "/src/assets/icons/folder_open.svg";
  return showChildren.value ? pointDown : pointRight;
});

function toggleChildren() {
  showChildren.value = !showChildren.value;
}
</script>


<template>
  <div class="node drop-zone" draggable="true" :style="nodeMargin">
    <div class="item" @click="toggleChildren">
      <img :src="toggleChildrenIcon" v-if="hasChildren" />
      <span>[ID: {{ node.Id }}]</span> <!-- DEBUG -->
      <span>{{ node.Title.toLowerCase() }}</span>
    </div>
    <div v-if='hasChildren' v-show="showChildren">
      <TreeNode v-for="child in node.Bookmarks" :key="child.id" :node="child" :spacing="spacing" />
    </div>
  </div>
</template>


<style scoped>
div.node {
  width: fit-content;
  border-radius: 7px;
  padding: 2px;
  margin: 10px;

  /* V1
  background-color: var(--rp-highlight-low);
  */

  /* V2
  background-color: rgba(80, 80, 80, 0.2);
  */

  /* V3 */
  background-color: rgba(235, 188, 186, 0.3);

  font-family: var(--bks-big-text);
  cursor: default;
  box-shadow: 0 0 10px -2px black;
}

div.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 5px 9px;
  border-radius: 5px;
  background-color: var(--rp-highlight-low);
}

div.item:hover {
  background-color: var(--rp-highlight-high);
  color: black;
  cursor: pointer;
}
</style>
