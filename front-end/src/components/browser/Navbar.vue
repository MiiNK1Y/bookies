<script setup>
import { selected } from '@/stores/browserView.js';
</script>

<template>
  <div class="navbar">
    <div class="btn selected">
      <img class="settings" src="/src/assets/icons/list-ul-solid.svg" />
      <span>Bookmarks</span>
    </div>
    <div class="btn">
      <img class="settings" src="/src/assets/icons/file-code-solid.svg" />
      <span>File</span>
    </div>
    <div class="btn">
      <img class="settings" src="/src/assets/icons/ghost-solid.svg" />
      <span>Hidden</span>
    </div>
    <div class="btn">
      <img class="settings" src="/src/assets/icons/trash-can-solid.svg" />
      <span>Trash</span>
    </div>
    <div class="btn">
      <img class="settings" src="/src/assets/icons/gear-solid.svg" />
      <span>Settings</span>
    </div>
  </div>
</template>

<style scoped>
div.navbar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
}

div.btn {
  float: right;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 10px 10px 0 0;
  margin: 3px 3px 0 3px;
  font-size: 1.2em;
  cursor: pointer;
}

div.selected {
  position: relative;
  background-color: black;
}

div.selected:before,
div.selected:after {
  content: "";
  position: absolute;
  bottom: 0;
  height: 20px;
  width: 20px;
  background-color: var(--rp-highlight-med);
  cursor: default;
}

div.selected:before {
  left: -20px;
  border-radius: 0 0 10px 0;
  box-shadow: 5px 5px 0 0 black;
}

div.selected:after {
  right: -20px;
  border-radius: 0 0 0 10px;
  box-shadow: -5px 5px 0 0 black;
}
</style>
