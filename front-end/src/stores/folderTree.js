/*
* TODO:
* - Rewrite scrappy function to a class for better maintenance.
*/

import data from '../tests/bookies/samples/Bookies.json';
import { Flatten, Rebuild } from '@/modules/bookies/bookies.js';
import { ref } from 'vue';

let bookies = data;
let bookiesFlat = new Flatten(bookies).flat;

export const bookiesRef = ref(bookies);

export function movedItem(updatedFlat) {
  const itemId = updatedFlat[0];
  const newParentId = updatedFlat[1];

  if (itemId == newParentId) return;

  console.log(`\nmoved item [${itemId}] to [${newParentId}]`);

  const flat = [...bookiesFlat];

  const folders = flat.filter((i) => i.Type == "Folder");
  const oldParent = folders.find((i) => i.Children.includes(itemId));
  if (oldParent) {
    const oldParentIndex = flat.findIndex((p) => p.Id == oldParent.Id);
    const childIndex = flat[oldParentIndex].Children.indexOf(itemId);
    flat[oldParentIndex].Children.splice(childIndex, 1);
  }

  const newParentIndex = flat.findIndex((p) => p.Id == newParentId);
  if (newParentIndex) {
    flat[newParentIndex].Children.push(itemId);
  }

  bookies = new Rebuild(flat).bookies;
  bookiesFlat = new Flatten(bookies).flat;
  bookiesRef.value = bookies;
}