import { nextTick } from 'vue';

import { state, bookies } from '@/stores/bookies.js';
import { Rebuild } from '@/lib/bookies/rebuild.js';
import { Flatten } from '@/lib/bookies/flatten.js';


const itemIndex = () => {
  if (state.value.selected) {
    return bookies.flat.findIndex(a => a.Id === state.value.selected.Id);
  }
}


function rebuild() {
  bookies.regular = new Rebuild(bookies.flat).bookies;
  bookies.flat = new Flatten(bookies.regular).flat;

  state.value.bookies.regular = bookies.regular;
  state.value.bookies.flat = bookies.flat;
}


export function updateTitle(val) {
  state.value.selected.Title = val;
  bookies.flat[itemIndex()].Title = val;
  rebuild();
  console.log("updated title");
}


export function updateUrl(val) {
  state.value.selected.URL = val;
  bookies.flat[itemIndex()].URL = val;
  rebuild();
  console.log("updated url");
}


export function updateTags(val) {
  state.value.selected.Tags = val
  bookies.flat[itemIndex()].Tags = val;
  rebuild();
  console.log("updated tags");
}
