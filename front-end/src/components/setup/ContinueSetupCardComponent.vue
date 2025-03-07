<script setup>
const props = defineProps({
  header: String,
  subHeader: String,
  body: String,
});
</script>

<template>
  <div class="wrapper">
    <h2>{{ header }}</h2>
    <div class="highlight">
      <h3>{{ subHeader }}</h3>
    </div>
    <p>{{ body }}</p>
  </div>
</template>

<style scoped>
h2,
h3 {
  font-family: var(--bks-big-text);
}

h2 {
  margin-bottom: 0;
  font-size: 2em;
}

h3 {
  margin: 0;
}

div.highlight {
  height: fit-content;
  width: fit-content;
  border-radius: 10px;
  padding: 10px;
  margin: auto;
  background-color: var(--rp-highlight-low);
}

p {
  padding: 10px;
  margin: auto;
  opacity: 0.8;
  font-family: var(--bks-regular-text);
  font-size: 1.2em;
}

div.wrapper {
  display: grid;
  grid-template-rows: auto 1fr 1fr;
  row-gap: 10px;
  width: 250px;
  padding: 20px;
  border: 5px solid var(--rp-highlight-low);
  border-radius: 2em;
  background-color: var(--bks-base);
  text-align: center;
}
</style>
