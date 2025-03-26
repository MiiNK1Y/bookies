import { MoveTreeItem } from '@/stores/folderTree.js'
import { ref } from 'vue';

export const dragMode = ref(false);

// Drag and drop functionality.
export function startDrag(event, item) {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.Id);
  dragMode.value = true;
}

export function onDrop(event, parent) {
  const itemID = Number(event.dataTransfer.getData("itemID"));
  dragMode.value = false;
  new MoveTreeItem(parent, itemID);
}

export function onPositionDrop(event, parent, position, index) {
  const itemID = Number(event.dataTransfer.getData("itemID"));
  dragMode.value = false;
  new MoveTreeItem(parent, itemID, position, index);
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
