import { ref } from 'vue';


export const bookies = {
  regular: null,
  flat: null,
}


export const state = ref({
  selected: null,
  dragging: false,
  lastMoved: null,
  hovering: {
    folder: null
  },
  bookies: {
    regular: null,
    flat: null
  }
});
