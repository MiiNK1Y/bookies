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
    this.childType = this.itemType(this.childId);

    if (
      this.childType === "Bookmark" ||
        (
          this.newParentId != this.childId &&
          !this.newParentIsOwnChild(this.childId)
        )
    ) {
      this.update();
    }
  }

  oldParent = () => {
    const folders = this.flat.filter(a => a.Type == "Folder");
    const oldParent = folders.find(a => a.Children.includes(this.childId));
    if (oldParent) return oldParent.Id;
    else return null;
  };

  itemType(id) {
    const item = this.flat.find(a => a.Id === id);
    return item.Type;
  }

  /*
  * Search the entire branch of the moved parent's children to see if \
  * its new parent is there, cancelling the operation if true.
  */
  newParentIsOwnChild = (id) => {
    const cur = this.flat.find(a => a.Id == id);
    if (cur.Children.includes(this.newParentId)) return true;
    cur.Children.forEach(a => {
      if (this.itemType(a) === "Folder") return this.newParentIsOwnChild(a);
    });
    return false;
  };

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
    if (this.oldParentId) this.removeFromParent();
    if (this.newParentId) this.appendToParent();
    bookies = new Rebuild(this.flat).bookies;
    flatBookies = new Flatten(bookies).flat;
    bookiesTreeRef.value = bookies;
  }
}
