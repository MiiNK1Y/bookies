import { ref } from 'vue';


// To format tags correctly, since it is an array.
const parseTags = (tags) => {
  return tags.replace(/\s/g, "").split(",").join(", ");
}


export const bookies = {
  regular: null,
  flat: null,
}


export const state = ref({
  selected: null,
  dragging: false,
  hovering: {
    folder: null
  },
  bookies: {
    regular: null,
    flat: null
  }
});
