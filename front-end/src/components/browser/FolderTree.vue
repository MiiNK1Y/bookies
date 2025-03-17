<script setup>
// import { sample } from '@/controllers/api.js';
// import TreeNode from './TreeNode.vue';
//
import data from '@/assets/samples/Bookies.json';
import { Bookies } from '@/bookies/bookies.js';
import TreeNodeFlat from './TreeNodeFlat.vue';
import { ref } from 'vue';

const bookies = new Bookies(data);

// The original Bookies.json data, unmodified.
const Bookie = ref(bookies.bookies);

function updateBookies(flatBookies) {
  bookies.flatBookies = flatBookies;
  Bookie.value = bookies.bookies;
  console.log("Did that work?"); // it did not...
}
</script>


<template>
  <TreeNodeFlat v-for="node in Bookie.Bookmarks" :key="node" :node="node" @movedItem="updateBookies" />
</template>
