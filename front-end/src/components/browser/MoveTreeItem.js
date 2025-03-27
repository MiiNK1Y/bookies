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

export function onDrop(event, parentId = null, hoveredItemId = null, overUnder = null) {
  const itemId = Number(event.dataTransfer.getData("itemID"));
  dragMode.value = false;
  new MoveTreeItem(parentId, itemId, hoveredItemId, overUnder);
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
