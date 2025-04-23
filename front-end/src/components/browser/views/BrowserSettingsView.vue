<script setup>
import { styleState, settingsState, debugState, } from '@/stores/settings.js';
import SettingsSwitch from '@/components/browser/SettingsSwitch.vue';
</script>


<template>
  <div class="main-view">
    <div class="container">

      <h1>General</h1>
      <div class="setting">
        <p>Some description of the setting here</p>
      </div>

      <hr>

      <h1>Style</h1>
      <div class="setting">
        <p>Show title of node as all uppercase <br>
        <i>Does not affect the bookies file, only for visual.</i></p>
        <SettingsSwitch
          :setting="styleState.text.nodeTitleAllUppercase"
          @toggle="styleState.text.nodeTitleAllUppercase =
            !styleState.text.nodeTitleAllUppercase"
        />
      </div>

      <div class="setting">
        <p>Show title of node as all lowercase <br>
        <i>Does not affect the bookies file, only for visual.</i></p>
        <SettingsSwitch
          :setting="styleState.text.nodeTitleAllLowercase"
          @toggle="styleState.text.nodeTitleAllLowercase =
            !styleState.text.nodeTitleAllLowercase"
        />
      </div>

      <div class="setting">
        <p>Replace node title whitespaces with underscores</p>
        <SettingsSwitch
          :setting="styleState.text.nodeTitleUnderscoreReplacesWhitespace"
          @toggle="styleState.text.nodeTitleUnderscoreReplacesWhitespace =
            !styleState.text.nodeTitleUnderscoreReplacesWhitespace"
        />
      </div>

      <hr>

      <h1>Debug</h1>
      <div class="setting">
        <p>Color the node drop-zones during drag event</p>
        <SettingsSwitch
          :setting="debugState.showColoredDropzones"
          @toggle="debugState.showColoredDropzones =
            !debugState.showColoredDropzones"
        />
      </div>

      <div class="setting">
        <p>Show ID of node</p>
        <SettingsSwitch
          :setting="debugState.showNodeId"
          @toggle="debugState.showNodeId = !debugState.showNodeId"
        />
      </div>

      <div class="setting">
        <p>Show index of node</p>
        <SettingsSwitch
          :setting="debugState.showNodeIndex"
          @toggle="debugState.showNodeIndex = !debugState.showNodeIndex"
        />
      </div>

    </div>
  </div>
</template>


<style scoped>
hr {
  width: 100%;
  color: var(--rp-highlight-med);
}

div.main-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

div.container {
  display: grid;
  gap: 15px;
}

div.setting {
  position: relative;
  display: grid;
  gap: 50px;
  grid-template-columns: auto auto;
}

div.setting p {
  margin: 0;
}

div.setting p i {
  opacity: 0.5;
}

/* Force the switch towards the right */
.setting :deep(.switch) {
  margin-left: auto;
}
</style>
