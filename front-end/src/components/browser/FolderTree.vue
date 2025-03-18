<script setup>
import TreeNodeFlat from './TreeNodeFlat.vue';
import { Bookies } from '@/bookies/bookies.js';
import data from '@/assets/samples/Bookies.json';
import { ref } from 'vue';

const b = new Bookies(data);
const bookies = ref(b.bookies);

function movedItem(updatedFlat) {
  console.log("\n[FOLDER_TREE] Item moved!");

  const flat = [...b.flatBookies];
  console.log("\n[FOLDER_TREE] Flat:\n", flat);
  console.log("\n[FOLDER_TREE] The bookies we will derive a clone from:\n", bookies.value);
  //console.log("\n[FOLDER_TREE] The original flat array we will modify:\n", b.flatBookies);

  const itemId = updatedFlat[0];
  const newParentId = updatedFlat[1];

  const folders = flat.filter((i) => i.Type == "Folder");
  const oldParent = folders.find((i) => i.Children.includes(itemId));
  console.log(`\n[FOLDER_TREE] Moving itemId [${itemId}] from oldParent [${oldParent.Id}] to newParent [${newParentId}]`);

  const oldParentIndex = flat.findIndex((p) => p.Id == oldParent.Id);
  const childIndex = flat[oldParentIndex].Children.indexOf(itemId);
  flat[oldParentIndex].Children.splice(childIndex, 1);
  const newParentIndex = flat.findIndex((p) => p.Id == newParentId);
  flat[newParentIndex].Children.push(itemId);

  b.flatBookies = flat;
  bookies.value = b.bookies;

  console.log("\n[FOLDER_TREE] Restructured and set flatBookies:\n", b.flatBookies);
  console.log("\n[FOLDER_TREE] Setting new bookies value:\n", b.bookies);

  // WARNING: Current bug: when cloning the "bookies.value", reactivity stuff are cloned aswell, how
  // to remove reactivity from a component?
}
</script>

<template>
  <TreeNodeFlat v-for="node in bookies.Bookmarks" :key="node" :node="node" @dragAndDrop="movedItem" />
</template>
