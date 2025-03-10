<script setup>
import { shrinkWrapAll } from '@/helpers.js';
import ContinueSetupCardComponent from '@/components/setup/ContinueSetupCardComponent.vue';
import { onMounted, nextTick } from 'vue';

/*
 * Shrink-wrap the contents of each subHeader
 * after the parent component is mounted and rendered.
 */
onMounted(async () => {
  await nextTick();
  shrinkWrapAll(document.querySelectorAll(".wrapper .highlight h3"));
});
</script>

<template>
  <div>
    <h1>Welcome to Bookies!</h1>
    <p>Your bookmarks, in every browser.</p>
    <div class="meta-links">
      <a href="#" target="_blank"><button>About</button></a>
      <a href="#" target="_blank"><button>Homepage</button></a>
    </div>
    <div class="container">
      <ContinueSetupCardComponent header="First time setup" subHeader="A new user and vault"
        body="First time setting up Bookies?" />
      <ContinueSetupCardComponent header="First time setup" subHeader="Only vault"
        body="Only you who are going to use Bookies?" />
      <ContinueSetupCardComponent header="Import a vault" subHeader="Import a vault without creating a user"
        body="Used Bookies before?" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin: 0 0 10px 0;
  font-family: var(--bks-big-text);
  font-size: 3em;
  text-align: center;
}

p {
  font-family: var(--bks-regular-text);
  text-align: center;
}

div.meta-links {
  margin-top: 5vh;
  margin-bottom: 10vh;
  text-align: center;
}

div.meta-links button {
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  background-color: var(--rp-love);
  font-family: var(--bks-regular-text);
  font-size: 1.5em;
}

div.container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
