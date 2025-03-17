<script setup>
import { ref, computed } from 'vue';
import { bookies } from '@/bookies/load.js';

const BookiesFlat = bookies.flatBookies;

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

const emit = defineEmits(['movedItem']);

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

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.Id);
}

const onDrop = (event, parent) => {
  const itemID = event.dataTransfer.getData("itemID");
  const item = BookiesFlat.find((i) => i.Id == itemID);

  const folders = BookiesFlat.filter((i) => i.Type == "Folder");
  const oldParent = folders.find((i) => i.Children.includes(item.Id));
  const oldParentIndex = BookiesFlat.findIndex((p) => p.Id == oldParent.Id);
  const childIndex = BookiesFlat[oldParentIndex].Children.indexOf(item.Id);
  BookiesFlat[oldParentIndex].Children.splice(childIndex, 1);

  const newParentIndex = BookiesFlat.findIndex((p) => p.Id == parent);
  BookiesFlat[newParentIndex].Children.push(item.Id);

  // try to 'refresh bookies after dropping the item (?)'
  console.log("updating structure...");

  console.log("Moved item ID:", itemID, " from: ", oldParent.Id, " to: ", parent);
  console.log("updated structure: ", BookiesFlat);

  // emit the change.
  emit('movedItem', BookiesFlat);

  /*
  * NOTE:
  * Now that the FlatArray has been updated, \
  * we now need to figure out how to push those changes \
  * to the Bookies instance and redraw the tree to visualize \
  * those changes.
  *
  * NOTE:
  * WHERE TO STORE REACTIVE COMPONENTS TO RESPOND TO CHANGING VALUE OF GETTER?
  *
  * TODO:
  * - Need to figure out reactivity of flat-bookies. How to update this ref() \
  *   after modifying Bookies? Where should the instance live?
  *     - Perhaps let the instance live in the parent component (BrowserView)?
  *       - Would that create issues for nested components that maybe wont emit \
  *         to this parent component because of the deep nesting?
  *
  * WARNING: CURRENT BUGS
  * - Can't move item from root to new parent (root has no identifier).
  * - When moving item to nested folder, it waterfalls down to the top-most \
  *   folder, since that is *technically* hovered over aswell.
  */
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
