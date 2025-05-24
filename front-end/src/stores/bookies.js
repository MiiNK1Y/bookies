import { ref } from 'vue';


export const bookies = {
  regular: null,
  flat: null,
  showing: null
}


export const state = ref({
  selected: null,
  dragging: false,
  lastMoved: null,
  showing: null,
  hovering: {
    folder: null
  },
  bookies: {
    regular: null,
    flat: null
  }
});
