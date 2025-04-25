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


/*
* BUG:
* When updating the title of a Bookmark, the change is not shown until \
* you hover over the bookmark or focus another item.
*
* INFO:
* - The bug does not affect Folders, they update as intended.
* - Both the ref() state and the main Bookies object update \
*   (flatten and rebuilds) as intended.
*/
export function updateTitle(val) {
  state.value.selected.Title = val;
  bookies.flat[itemIndex()].Title = val;

  rebuild();
  console.log("updated title: ", state.value.selected.Title);
}


export function updateUrl(val) {
  state.value.selected.URL = val;
  bookies.flat[itemIndex()].URL = val;

  rebuild();
  console.log("updated url: ", state.value.selected.URL);
}


export function updateTags(val) {
  const arr = val.replace(" ", "").split(",");
  console.log("new array of tags: ", arr);

  const filter = [...new Set(arr)];
  console.log("new filtered array of tags: ", filter);

  state.value.selected.Tags = filter;
  console.log("new string of tags: ", val);

  bookies.flat[itemIndex()].Tags = filter;

  rebuild();
  console.log("updated tags: ", state.value.selected.Tags);
}
