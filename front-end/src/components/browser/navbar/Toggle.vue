<script setup>
import { toggles } from '@/stores/toggles.js';

/*
* NOTE:
* How should I go about the toggle function to avoid having to \
* recreate the function for every toggle, but just pass some props \
* to make this component resuable... Can reactive values usable as props?
*/

</script>

<template>
  <div
    @click="toggleTree"
    class="container"
    :class="toggles.treeJson ? 'containerOn' : ''">

    <div
      class="switch"
      :class="toggles.treeJson ? 'switchOn' : ''">
    </div>

  </div>
</template>

<style scoped>
div.container {
  height: 2em;
  width: 4em;
  border: 3px solid transparent;
  border-radius: 2em;
  margin: 5px;
  cursor: pointer;
  background-color: var(--rp-love);
  transition: background-color 0.2s ease;
}

div.switch {
  height: 100%;
  margin-left: 0;
  width: 50%;
  border-radius: 50%;
  background-color: var(--rp-text);
  transition: margin-left 0.2s ease;
}

div.containerOn {
  background-color: var(--rp-foam);
  transition: background-color 0.2s ease;
}

div.switchOn {
  margin-left: 50%;
}
</style>
