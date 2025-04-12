import { MoveTreeItem } from '@/lib/folderTree.js'
import { ref } from 'vue';

export const dragMode = ref(false);
export const hoveringFolder = ref(null);

export function startDrag(event, item) {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.Id);
  dragMode.value = true;
}

export function onDrop(event, parentId, hoveredItemId, overUnder) {
  const itemId = Number(event.dataTransfer.getData("itemID"));
  dragMode.value = false;
  hoveringFolder.value = null;
  new MoveTreeItem(itemId, parentId, hoveredItemId, overUnder);
}

export function onDragEnd() {
  dragMode.value = false;
  hoveringFolder.value = null;
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
