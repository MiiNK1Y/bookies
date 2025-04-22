import { ref } from 'vue';

const parseTags = (tags) => {
  return tags.replace(/\s/g, "").split(",").join(", ");
}

export const state = ref({
  dragMode: false,
  hoveringFolder: null,

  // demo data, will be replaced for regular item.
  selected: {
    title: "some test",
    url: "https://deez.nuts",
    tags: ["tag", "tags"],
  },
  bookies: {
    regular: null,
    flat: null,
  },
});

export const update = {
  dragMode: function() {
    state.value.dragMode = !state.value.dragMode;
  },
  hoveringFolder: function(folder) {
    state.value.hoveringFolder = folder;
  },
  title: function(title) {
    state.value.selected.title = title;
  },
  url: function(url) {
    state.value.selected.url = url;
  },
  tags: function(tags) {
    state.value.selected.tags = parseTags(tags);
  },
};
