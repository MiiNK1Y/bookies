<!-- NOTE: NodeHead.vue -->

<script setup>
const props = defineProps({
  type:   { type: String, required: true }
  title:  { type: String, required: true },
  id:     { type: Number, required: true },
  index:  { type: Number, required: true },
  open:   { type: Boolean, required: true, default: false }
});
</script>

<template>
  <div
    @mouseover=""
    @mouseleave=""
    @dragstart=""
    @dragend=""
    @click=""
    :class=""
    draggable="true"
    class="" >

      <div
        v-if="type === 'Bookmark'"
        class="favicon-placeholder">
      </div>

      <img
        v-else-if="type === 'Folder'"
        @click.stop="$emit('showChildren')"
        :src="icon"
        draggable="false"
      />

      <span class="id">
        [<slot name="id"></slot>]
      </span>

      <span class="index">
        [<slot name="index"></slot>]
      </span>

      <span>
        <slot></slot>
      </span>
  </div>
</template>
