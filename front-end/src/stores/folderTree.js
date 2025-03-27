import data from '../tests/shared-samples/Bookies.json';
import { Flatten, Rebuild } from '../modules/bookies/bookies.js';
import { ref } from 'vue';


export const state = {
  bookies: data,
  flatBookies: null
};
state.flatBookies = new Flatten(state.bookies).flat;

export const stateRefs = ref({
  bookies: data,
  flatBookies: null
});
stateRefs.value.flatBookies = state.flatBookies

export const bookiesTreeRef = ref(state.bookies);


export class MoveTreeItem {
  constructor(newParentId, childId, hoveredItemId = null, overUnder = null) {
    this.newParentId = newParentId;
    this.childId = childId;
    this.hoveredItemId = hoveredItemId;
    this.overUnder = overUnder;

    this.flat = [...state.flatBookies];

    this.oldParentId = this.oldParentId() ?? null;
    this.oldParentIndex = this.flat.findIndex(a => a.Id == this.oldParentId) ?? null;
    this.newParentIndex = this.flat.findIndex(a => a.Id == this.newParentId) ?? null;
    this.indexOfHovered = null;

    console.log("before operation starts...");
    console.log(`newParent = [${this.newParentId}], childId = [${this.childId}], overUnder = [${this.overUnder}], hoveredOver = [${this.hoveredItemId}], previousParent = [${this.oldParentId}]`);

    if (
      this.itemType(this.childId) === "Bookmark" ||
        (
          this.newParentId != this.childId &&
          !this.newParentIsOwnChild(this.childId)
        )
    ) {
      if (this.oldParentId) this.removeChildFromParent();

      this.indexOfHovered = this.newParentId != null
        ? this.flat[this.newParentIndex].Children.indexOf(this.hoveredItemId)
        : this.flat.findIndex(a => a.Id === this.hoveredItemId);

      if (this.hoveredItemId) this.appendToParentPosition();
      else this.appendToParent();

      this.updateGlobals();
    }

    console.log(`newParent = [${this.newParentId}], childId = [${this.childId}], overUnder = [${this.overUnder}], hoveredOver = [${this.hoveredItemId}], previousParent = [${this.oldParentId}]`);
  }

  oldParentId = () => {
    const folders = this.flat.filter(a => a.Type == "Folder");
    const oldParent = folders.find(a => a.Children.includes(this.childId));
    if (oldParent) return oldParent.Id;
    else return;
  };

  itemType = (id) => {
    const item = this.flat.find(a => a.Id === id);
    return item.Type;
  }

  newParentIsOwnChild = (id) => {
    const cur = this.flat.find(a => a.Id == id);

    if (cur.Children.includes(this.newParentId)) return true;

    return cur.Children.some(a => {
      if (this.itemType(a) === "Folder") {
        return this.newParentIsOwnChild(a);
      }
    });
  };

  // recheck the index when having to pop from root folder before appending again.
  recheckIndexOfHovered = () => {
    this.indexOfHovered = this.newParentId != null
      ? this.flat[this.newParentIndex].Children.indexOf(this.hoveredItemId)
      : this.flat.findIndex(a => a.Id === this.hoveredItemId);
  }

  removeChildFromParent() {
    const childIndex = this.flat[this.oldParentIndex].Children.indexOf(this.childId);
    this.flat[this.oldParentIndex].Children.splice(childIndex, 1);
  }

  appendToParentPosition() {
    if (this.overUnder === 'under') this.indexOfHovered++;

    // If new parent is root.
    if (this.newParentId === null) {
      const flatItem = this.flat.find(a => a.Id === this.childId);
      const itemFlatIndex = this.flat.findIndex(a => a.Id === this.childId);
      this.flat.splice(itemFlatIndex, 1);
      this.recheckIndexOfHovered();
      this.flat.splice(this.indexOfHovered, 0, flatItem);
    }

    // If new parent is NOT root.
    else {
      this.flat[this.newParentIndex].Children.splice(this.indexOfHovered, 0, this.childId);
    }

    //console.log(`index of new parent = [${this.newParentIndex}], its children = `, this.flat[this.newParentIndex].Children);
  }

  appendToParent() {
    if (this.newParentId) this.flat[this.newParentIndex].Children.push(this.childId);

    // If the new parent is root.
    else {
      const item = this.flat.find(a => a.Id === this.childId);
      const itemIndex = this.flat.findIndex(a => a.Id === this.childId);
      this.flat.splice(itemIndex, 1);
      this.flat.push(item);
    }
  }

  updateGlobals() {
    state.bookies = new Rebuild(this.flat).bookies;
    state.flatBookies = new Flatten(state.bookies).flat;
    bookiesTreeRef.value = state.bookies;

    // State refs.
    stateRefs.value.bookies = state.bookies;
    stateRefs.value.flatBookies = state.flatBookies;
  }
}
