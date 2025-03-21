<script setup>
import TreeNode from './TreeNode.vue';
import { Flatten, Rebuild } from '@/modules/bookies/bookies.js';
import data from '@/assets/samples/Bookies.json';
import { ref } from 'vue';

let bookies = data;
//let bookiesFlat = new Flatten(bookies);
//console.log("data", data);
//console.log("original flat:\n", bookiesFlat);

const bookiesRef = ref(bookies);

function movedItem(updatedFlat) {
  const itemId = updatedFlat[0];
  const newParentId = updatedFlat[1];

  const flat = [...bookiesFlat];
  //console.log("cloned flat:\n", JSON.parse(JSON.stringify(flat)));

  const folders = flat.filter((i) => i.Type == "Folder");
  const oldParent = folders.find((i) => i.Children.includes(itemId));
  const oldParentIndex = flat.findIndex((p) => p.Id == oldParent.Id);
  const childIndex = flat[oldParentIndex].Children.indexOf(itemId);

  flat[oldParentIndex].Children.splice(childIndex, 1);

  const newParentIndex = flat.findIndex((p) => p.Id == newParentId);
  flat[newParentIndex].Children.push(itemId);
  //console.log("modified flat:\n", JSON.parse(JSON.stringify(flat)));

  bookiesFlat = flat;
  bookiesRef.value = rebuild(flat);
}
</script>


<template>
  <TreeNode v-for="node in bookiesRef.Bookmarks" :key="node.Id" :node="node" @dragAndDrop="movedItem" />
</template>
