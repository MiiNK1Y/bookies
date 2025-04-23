<script setup>
const props = defineProps({
  setting: {
    type: Boolean,
    required: true,
    default: true
  }
});


const emits = defineEmits(['toggle']);
</script>


<template>
  <div
    class="switch"
    :class="{ 'on': setting }"
    @click="$emit('toggle')" >

    <div
      class="switch_slider"
      :class="{ 'on': setting }">
    </div>

  </div>
</template>


<style scoped>
div.switch {
  width: 3em;
  height: 1.5em;
  border: 2px solid var(--ct-red);
  border-radius: 5em;
  background: var(--ct-red);
  cursor: pointer;
}

div.switch_slider {
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: var(--rp-text);
  box-shadow: inset 0 0 10px -5px var(--rp-base);
}

div.switch_slider.on {
  float: right;
}

div.switch.on {
  background: var(--ct-green);
  border: 2px solid var(--ct-green);
}
</style>
