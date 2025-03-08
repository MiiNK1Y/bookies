<script setup>
import TreeNode from './TreeNode.vue';
import { getBookies } from '@/api.js';
import { computed } from 'vue';

// const bookies = getBookies();

const sample = computed(() => {
  return {
    "Bookies version": "0.0.1",
    "Bookmarks":
      [
        {
          "Type": "Bookmark",
          "BookmarksId": 0,
          "Title": "Title of the Bookmark",
          "URL": "https://vg.no",
          "Tags": ["News", "Norwegian News", "Demo Website"]
        },
        {
          "Type": "Folder",
          "FolderId": 0,
          "Title": "Some Folder Name Here",
          "Bookmarks":
            [
              {
                "Type": "Bookmark",
                "BookmarksId": 1,
                "Title": "Has Id 2",
                "URL": "https://wikipedia.com",
                "Tags": ["Information", "Info"]
              },
              {
                "Type": "Bookmark",
                "BookmarksId": 2,
                "Title": "Has Id 3",
                "URL": "https://alnyk.pages.dev",
                "Tags": ["Personal", "Portfolio", "Personal Project"]
              }
            ]
        },
        {
          "Type": "Bookmark",
          "BookmarksId": 0,
          "Title": "Title of the second Bookmark",
          "URL": "https://vg.no",
          "Tags": ["News", "Norwegian News", "Demo Website"]
        },
        {
          "Type": "Folder",
          "FolderId": 0,
          "Title": "Some New Folder Name Here",
          "Bookmarks":
            [
              {
                "Type": "Bookmark",
                "BookmarksId": 3,
                "Title": "Has Id 3",
                "URL": "https://wikipedia.com",
                "Tags": ["Information", "Info"]
              },
              {
                "Type": "Folder",
                "FolderId": 0,
                "Title": "Some Nested Folder Name Here",
                "Bookmarks":
                  [
                    {
                      "Type": "Bookmark",
                      "BookmarksId": 5,
                      "Title": "Has Id 5",
                      "URL": "https://wikipedia.com",
                      "Tags": ["Information", "Info"]
                    },
                    {
                      "Type": "Bookmark",
                      "BookmarksId": 6,
                      "Title": "Has Id 6",
                      "URL": "https://alnyk.pages.dev",
                      "Tags": ["Personal", "Portfolio", "Personal Project"]
                    }
                  ]
              },
              {
                "Type": "Bookmark",
                "BookmarksId": 4,
                "Title": "Has Id 4",
                "URL": "https://alnyk.pages.dev",
                "Tags": ["Personal", "Portfolio", "Personal Project"]
              }
            ]
        }
      ]
  }
});
</script>

<template>
  <div>
    <TreeNode
      v-for="node in sample.Bookmarks"
      :key="node"
      :node="node"
    />
  </div>
</template>

<style scoped>
div {
  height: 100vh;
  width: 400px;
  background-color: var(--rp-base);
}
</style>

<style>
/* Overwrite the default app size for full-screen */
#app {
  width: 100vw;
  margin: 0;
  padding: 0;
}
</style>
