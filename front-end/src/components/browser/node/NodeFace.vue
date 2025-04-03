<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true
  }
});
</script>

<template>
  <span
    v-if="type === 'Bookmark'">

    <div class="favicon-placeholder"></div>
  </span>

  <img
    v-else-if="type === 'Folder'"
    draggable="false"
    @click.stop=""
    :src="" />

  <span style="color: orange">{{ node.Id }}</span>
  <span style="color: green">[{{ index }}]</span>
  <span>{{ node.Title.toLowerCase() }}</span>
</template>
