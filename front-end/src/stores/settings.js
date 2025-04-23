import { ref } from 'vue';


export const styleState = ref({
  colors: {
    browser: {
      background: null,
      tree: null,
      navbar: null,
      main: null,
      navbarCurrentTab: null
    },
    node: {
      background: null,
      dropZoneBorder: null,
      headBackground: null,
      headSelectedBorder: null,
      headText: null
    },
    tab: {
      bookmarks: {
        sameColorAsTree: false,
        nodeHeadBackground: null,
        nodeHeadSelectedBorder: null,
        nodeHeadText: null
      }
    }
  },
  text: {
    nodeTitleAllUppercase: false,
    nodeTitleAllLowercase: false,
    nodeTitleMaxRederedLength: 50,
    nodeTitleUnderscoreReplacesWhitespace: false
  }
});


export const settingsState = ref({
  tree: {
    keepOpen: [null],
    nodeFolderHoverToOpenDelay: 500,
  }
});


export const debugState = ref({
  showColoredDropzones: false,
  showNodeId: true,
  showNodeIndex: true,
});
