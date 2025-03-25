import { MoveTreeItem } from '@/stores/folderTree.js'

// Drag and drop functionality.
export function startDrag(event, item) {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.Id);
}

export function onDrop(event, parent) {
  const itemID = Number(event.dataTransfer.getData("itemID"));
  new MoveTreeItem(parent, itemID);
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
