<script setup>
import Toggle from './navbar/Toggle.vue';
</script>

<template>
  <div class="navbar">
    <div class="btn selected">
      <img class="settings" src="/src/assets/icons/list-ul-solid.svg" />
      <span>Bookmarks</span>
    </div>
    <div class="btn selected">
      <img class="settings" src="/src/assets/icons/file-code-solid.svg" />
      <span>File</span>
    </div>
    <div class="btn selected">
      <img class="settings" src="/src/assets/icons/ghost-solid.svg" />
      <span>Hidden</span>
    </div>
    <div class="btn selected">
      <img class="settings" src="/src/assets/icons/trash-can-solid.svg" />
      <span>Trash</span>
    </div>
    <div class="btn selected">
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
  gap: 5px;
}

div.btn {
  float: right;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 10px;
  margin: 3px;
  font-size: 1.2em;
  cursor: pointer;
}

div.selected {
  background-color: var(--rp-base);
}
</style>
