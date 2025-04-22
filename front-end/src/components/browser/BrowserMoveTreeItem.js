import { ref } from 'vue';

import { state, bookies } from '@/stores/bookies.js';

import { Move } from '@/lib/bookies/move.js';
import { Rebuild } from '@/lib/bookies/rebuild.js';
import { Flatten } from '@/lib/bookies/flatten.js';


export function startDrag(event, item) {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.Id);

  state.value.dragging = true;
}


export function onDrop(event, parentId, hoveredItemId, overUnder) {
  const itemId = Number(event.dataTransfer.getData("itemID"));

  state.value.dragging = false;
  state.value.hovering.folder = null;

  const update = new Move(bookies.flat, itemId, parentId, hoveredItemId, overUnder).update;

  bookies.flat = update;
  bookies.regular = new Rebuild(update).bookies;

  console.log("flat updated:\n", bookies.flat);
  console.log("regular updated:\n", bookies.regular);

  state.value.bookies.flat = bookies.flat;
  state.value.bookies.regular = bookies.regular;

  console.log("ref flat updated:\n", state.value.bookies.flat);
  console.log("ref regular updated:\n", state.value.bookies.regular);
}


export function onDragEnd() {
  state.value.dragging = false;
  state.value.hovering.folder = null;
}


export function setBackgroundColor(event) {
  if (event.target.classList.contains("drop-zone")) {
    event.target.classList.add("dragover");
  }
}


export function rmBackgroundColor(event) {
  if (event.target.classList.contains("drop-zone")) {
    event.target.classList.remove("dragover");
  }
}
