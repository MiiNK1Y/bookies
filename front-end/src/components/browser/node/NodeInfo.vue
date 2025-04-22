<script setup>
import { bookiesTreeRef } from '@/lib/folderTree.js';
import { state, update } from '@/stores/browserTree.js';
import { ref } from 'vue';
</script>

<template>
  <div class="info__container">

    <div class="info__title info__input-text">
      <p>Title</p>

      <input
        type="text"
        :value="state.selected.title"
        @change="update.title($event.target.value)" >
    </div>

    <div class="info__url info__input-text">
      <p>URL</p>

      <input
        type="text"
        :value="state.selected.url"
        @change="update.url($event.target.value)" >
    </div>

    <div class="info__tags info__input-text">
      <p>Tags</p>

      <input
        type="text"
        :value="state.selected.tags"
        @change="update.tags($event.target.value)" >
    </div>

  </div>
</template>

<style scoped>
div.info__container {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  display: grid;
  gap: 10px;
  width: 100%;
  border-radius: 6px;
  padding: 10px;
  background-color: var(--rp-highlight-low);
}

div.info__input-text {
  display: grid;
  grid-template-columns: 50px auto;
}

div.info__input-text p {
  margin: auto auto auto 0;
}

input {
  border: 2px solid var(--rp-highlight-med);
  padding: 5px 8px;
  background-color: transparent;
  font-family: var(--bks-regular-text);
  font-size: 1em;
  color: var(--rp-text);
}

input:focus {
  outline: none;
  border-color: var(--ct-red);
}
</style>
