import { ref } from 'vue';

import { state, bookies } from '@/stores/bookies.js';

import { Move } from '@/lib/bookies/move.js';
import { Rebuild } from '@/lib/bookies/rebuild.js';
import { Flatten } from '@/lib/bookies/flatten.js';


function resetDraggingAndHoveringState() {
  state.value.dragging = false;
  state.value.hovering.folder = null;

  setTimeout(() => {
    state.value.lastMoved = null;
  }, 400);
}


function update(itemId, parentId, hoveredItemId, overUnder) {
  const update = new Move(bookies.flat, itemId, parentId, hoveredItemId, overUnder).update;
  bookies.regular = new Rebuild(update).bookies;
  bookies.flat = new Flatten(bookies.regular).flat;
  state.value.bookies.regular = bookies.regular;
  state.value.bookies.flat = bookies.flat;
}


export function startDrag(event, item) {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.Id);
  state.value.dragging = true;
  state.value.lastMoved = item.Id;
}


export function onDragEnd(event) {
  resetDraggingAndHoveringState();
}


/*
 * BUG:
 * When dropping an item inside a new folder, the highlight-blinking does not show.
 * But when moving that same item to a new position inside the same folder \
 * the blinking shows as intended.
 */
export function onDrop(event, parentId, hoveredItemId, overUnder) {
  const itemId = Number(event.dataTransfer.getData("itemID"));
  update(itemId, parentId, hoveredItemId, overUnder);
}


export function setBackgroundColor(event) {
  if (event.target.classList.contains("drop-zone")) {
    event.target.classList.add("dragover");
  }
}


export function rmBackgroundColor(event) {
  if (event.target.classList.contains("dragover")) {
    event.target.classList.remove("dragover");
  }
}
