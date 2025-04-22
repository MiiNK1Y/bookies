<script setup>
import { state } from '@/stores/bookies.js';
</script>

<template>
  <div class="main-view">
    <div class="data">
      <h4>Your file</h4>
      <pre><code>{{ state.bookies.regular }}</code></pre>
    </div>

    <div class="data">
      <h4>Your file flattened</h4>
      <pre><code>{{ state.bookies.flat }}</code></pre>
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

h4 {
  padding: 4px;
  margin: 10px;
  border-radius: 10px;
  text-align: center;
  background-color: var(--rp-highlight-low);
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
