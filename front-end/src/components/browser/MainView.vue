<script setup>
import { stateRefs } from '@/stores/folderTree.js';
</script>


<template>
  <div class="main-view">
    <div class="bookies-data">
      <div class="code">
        <pre><code>{{ stateRefs.bookies }}</code></pre>
      </div>
    </div>
    <div class="flat-data">
      <div class="code">
        <pre><code>{{ stateRefs.flatBookies }}</code></pre>
      </div>
    </div>
  </div>
</template>


<style scoped>
h2 {
  margin: 0;
}

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

div.bookies-data,
div.flat-data {
  border-radius: 10px;
  background-color: black;
  overflow: scroll;
}

div.bookies-header,
div.flat-header {
  border-radius: 0.5em;
  background-color: var(--rp-highlight-med);
  text-align: center;
}

.code {
  padding: 0 5px;
}

pre code {
  white-space: pre-wrap;
}
</style>
