<script setup>
import { stateRefs } from '@/lib/folderTree.js';
</script>

<template>
  <div class="main-view">
    <div class="data">
      <pre><code>{{ stateRefs.bookies }}</code></pre>
    </div>
    <div class="data">
      <pre><code>{{ stateRefs.flatBookies }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
div.main-view {
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  display: grid;
  grid-template-columns: auto auto;
  gap: 5px;
}

div.data {
  border-radius: 10px;
  background-color: var(--rp-base);
  overflow: scroll;
  padding: 0 5px;
}

pre code {
  white-space: pre-wrap;
}
</style>
