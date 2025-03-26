import data from '../tests/shared-samples/Bookies.json';
import { Flatten, Rebuild } from '../modules/bookies/bookies.js';
import { ref } from 'vue';

export const state = {
  bookies: data,
  flatBookies: null
};
state.flatBookies = new Flatten(state.bookies).flat;

// State refs for visual representation of JSON
export const stateRefs = ref({
  bookies: data,
  flatBookies: null
});
stateRefs.value.flatBookies = state.flatBookies

export const bookiesTreeRef = ref(state.bookies);

export class MoveTreeItem {
  constructor(newParent, child, position = null, index = null) {
    this.flat = [...state.flatBookies];
    this.newParentId = newParent;
    this.childId = child;
    this.position = position;
    this.indexOfHovered = index;
    this.oldParentId = this.oldParent();
    this.childType = this.itemType(this.childId);

    console.log(`newParent = [${this.newParentId}], childId = [${this.childId}], position = [${this.position}], hoveredOver = [${this.indexOfHovered}]`);

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

  itemType = (id) => {
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

    return cur.Children.some(a => {
      if (this.itemType(a) === "Folder") {
        return this.newParentIsOwnChild(a);
      }
    });
  };

  removeFromParent() {
    const oldParentIndex = this.flat.findIndex(a => a.Id == this.oldParentId);
    const childIndex = this.flat[oldParentIndex].Children.indexOf(this.childId);
    this.flat[oldParentIndex].Children.splice(childIndex, 1);
  }

  shiftPositionInRoot() {
    const item = this.flat.find(a => a.Id === this.childId);
    const itemFlatIndex = this.flat.findIndex(a => a.Id === item.Id)
    delete this.flat[itemFlatIndex];
    this.flat.splice(this.indexOfHovered, 0, item);
  }

  appendToParentPosition(newParentIndex) {
    if (this.position === 'under' && this.newParentId != this.oldParentId) {
      this.indexOfHovered++;
    }

    if (!this.newParentId && !this.oldParentId) {
      shiftPositionInRoot();
    } else if (!this.newParentId) {
      const item = this.flat.find(a => a.Id === this.childId);
      const itemFlatIndex = this.flat.findIndex(a => a.Id === item.Id)
      delete this.flat[itemFlatIndex];
      this.flat[newParentIndex].splice(this.indexOfHovered, 0, hovered);
    }else {
      this.flat[newParentIndex].Children.splice(this.indexOfHovered, 0, this.childId);
    }

    console.log(`index of 'under (+)' hovered = [${this.indexOfHovered}]`);
    console.log(`index of new parent = [${newParentIndex}], its children = `, this.flat[newParentIndex].Children)
  }

  appendToParent() {
    const newParentIndex = this.flat.findIndex(a => a.Id == this.newParentId);

    if (this.position) {
      this.appendToParentPosition(newParentIndex);
    } else if (this.newParentId){
      this.flat[newParentIndex].Children.push(this.childId);
    }
  }

  update() {
    if (this.oldParentId) this.removeFromParent();
    if (this.newParentId) this.appendToParent();
    state.bookies = new Rebuild(this.flat).bookies;
    state.flatBookies = new Flatten(state.bookies).flat;
    bookiesTreeRef.value = state.bookies;

    // State refs.
    stateRefs.value.bookies = state.bookies;
    stateRefs.value.flatBookies = state.flatBookies;
  }
}
