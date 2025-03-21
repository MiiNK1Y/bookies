<script setup>
import TreeNode from './TreeNode.vue';
import { Flatten, Rebuild } from '@/modules/bookies/bookies.js';
import data from '@/assets/samples/Bookies.json';
import { ref } from 'vue';

let bookies = data;
let bookiesFlat = new Flatten(bookies).flat;

console.log("original bookies:\n", data);
console.log("original flat:\n", bookiesFlat);

const bookiesRef = ref(bookies);

function movedItem(updatedFlat) {
  console.log("receved emit...");
  const itemId = updatedFlat[0];
  const newParentId = updatedFlat[1];

  if (itemId == newParentId) return;

  console.log(`\nmoved item [${itemId}] to [${newParentId}]`);

  const flat = [...bookiesFlat];
  //console.log("cloned flat:\n", JSON.parse(JSON.stringify(flat)));

  const folders = flat.filter((i) => i.Type == "Folder");
  const oldParent = folders.find((i) => i.Children.includes(itemId));
  if (oldParent) {
    const oldParentIndex = flat.findIndex((p) => p.Id == oldParent.Id);
    const childIndex = flat[oldParentIndex].Children.indexOf(itemId);
    flat[oldParentIndex].Children.splice(childIndex, 1);
  }

  const newParentIndex = flat.findIndex((p) => p.Id == newParentId);
  if (newParentIndex) {
    flat[newParentIndex].Children.push(itemId);
  }

  //console.log("modified flat:\n", JSON.parse(JSON.stringify(flat)));

  bookies = new Rebuild(flat).bookies;
  bookiesFlat = new Flatten(bookies).flat;
  //console.log("Rebuildt from modified flat:\n", JSON.parse(JSON.stringify(bookies)));
  bookiesRef.value = bookies;
}
</script>


<template>
  <TreeNode v-for="node in bookiesRef.Bookmarks" :key="node.Id" :node="node" @dragAndDrop="movedItem" />
</template>
