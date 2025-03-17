<script setup>
import { ref, computed } from 'vue';
import { bookies } from '@/bookies/load.js';

const BookiesFlat = [...bookies.flatBookies];

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

// drag-and-drop
const startDrag = (event, item) => {
  console.log(item.Id);
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.Id);
}

const onDrop = (event, parent) => {
  console.log("All flat bookies: ", BookiesFlat);
  const itemID = event.dataTransfer.getData("itemID");
  console.log("itemID: ", itemID);
  const item = BookiesFlat.find((i) => i.Id == itemID);
  console.log("item: ", item);

  // here we need a way to switch the parent of the item,
  // also; think about if the item is moved to the root...
  // how does that go about?
  // Then, push the new flat item to Bookies to be restored, then re-render.

  // In order to seek through folders based on children, \
  // create an array with only folders.
  const folders = BookiesFlat.filter((i) => i.Type === "Folder");
  const oldParent = folders.find((i) => i.Children.includes(item.Id));
  const oldParentIndex = BookiesFlat.findIndex((p) => p.Id == oldParent.Id);
  console.log("oldParentIndex: ", oldParentIndex);

  const childIndex = BookiesFlat[oldParentIndex].Children.indexOf(item.Id);
  console.log("childIndex: ", childIndex);

  // Remove that itemID from the parent's children-list.
  BookiesFlat[oldParentIndex].Children.splice(childIndex, 1);

  // Append the item to its new parent.
  const newParentIndex = BookiesFlat.findIndex((p) => p.Id == parent);
  console.log("newParentIndex: ", newParentIndex);

  BookiesFlat[newParentIndex].Children.push(item.Id);

  console.log(BookiesFlat);
}
</script>


<template>
  <div
    class="node drop-zone"
    @drop="onDrop($event, node.Id)"
    @dragenter.prevent
    @dragover.prevent
    :style="nodeMargin"
  >
    <div
      class="item drag-el"
      @click="toggleChildren"
      draggable="true"
      @dragstart="startDrag($event, node)"
    >
      <img :src="toggleChildrenIcon" v-if="hasChildren" />
      <span>[ID: {{ node.Id }}]</span> <!-- DEBUG -->
      <span>{{ node.Title.toLowerCase() }}</span>
    </div>
    <div v-if='hasChildren' v-show="showChildren">
      <TreeNodeFlat
        v-for="child in node.Bookmarks"
        :key="child.id"
        :node="child"
        :spacing="spacing"
      />
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
