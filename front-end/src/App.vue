<script setup>
import { RouterView } from 'vue-router';

///*
//* Prevent FolderTree from freezing if item is dropped outside \
//* the drop-zones by catching the event everywhere else.
//*/
//function invalidDrop(event) {
//  const itemId = Number(event.dataTransfer.getData("itemID"));
//  console.log(`Item with ID [${itemId}] was dropped outside a valid drop-zone`);
//}
</script>

<template>
  <RouterView />
</template>
