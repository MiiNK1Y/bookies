import data from '../tests/bookies/samples/Bookies.json';
import { Flatten, Rebuild } from '@/modules/bookies/bookies.js';
import { ref } from 'vue';

let bookies = data;

export const bookiesTreeRef = ref(bookies);

let flatBookies = new Flatten(bookies).flat;

export class MoveTreeItem {
  constructor(newParent, child) {
    this.flat = [...flatBookies];
    this.newParentId = newParent;
    this.childId = child;
    this.oldParentId = this.oldParent();

    if (this.oldParentId) this.removeFromParent();
    if (this.newParentId) this.appendToParent();

    this.update();
  }

  oldParent = () => {
    const folders = this.flat.filter(a => a.Type == "Folder");
    const oldParent = folders.find(a => a.Children.includes(this.childId));
    if (oldParent) return oldParent.Id;
    else return null;
  };

  newParentIsOwnChild = () => {
    const child = this.flat.find(a => a.Id == this.childId);
    if (
      child.Type != "Folder" ||
      !child.Children.includes(this.newParentId)
    ) return false;
    else return true;
  }

  removeFromParent() {
    const oldParentIndex = this.flat.findIndex(a => a.Id == this.oldParentId);
    const childIndex = this.flat[oldParentIndex].Children.indexOf(this.childId);
    this.flat[oldParentIndex].Children.splice(childIndex, 1);
  }

  appendToParent() {
    const newParentIndex = this.flat.findIndex(a => a.Id == this.newParentId);
    this.flat[newParentIndex].Children.push(this.childId);
  }

  update() {
    if (this.newParentId == this.childId || this.newParentIsOwnChild()) return;
    bookies = new Rebuild(this.flat).bookies;
    flatBookies = new Flatten(bookies).flat;
    bookiesTreeRef.value = bookies;
  }
}
