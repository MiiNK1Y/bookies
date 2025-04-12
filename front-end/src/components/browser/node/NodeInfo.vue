<script setup>
import { bookiesTreeRef } from '@/lib/folderTree.js';
</script>

<template>
  <div class="info__container">
    <div class="info__title info__input-text">
      <p>title</p>
      <input type="text" />
    </div>
    <div class="info__url info__input-text">
      <p>url</p>
      <input type="text" />
    </div>
    <div class="info__tags info__input-text">
      <p>tags</p>
      <input type="text" placeholder="Separate tags with commas" />
    </div>
  </div>
</template>

<style scoped>
div.info__container {
  position: absolute;
  box-sizing: border-box;
  gap: 10px;
  display: grid;
  bottom: 0;
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
