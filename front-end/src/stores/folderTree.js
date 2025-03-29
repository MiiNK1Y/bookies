import data from '../tests/shared-samples/Bookies.json';
import { Flatten, Rebuild } from '../modules/bookies/bookies.js';
import { ref } from 'vue';


export const state = {
  bookies: data,
  flatBookies: null
};

state.flatBookies = new Flatten(state.bookies).flat;

export const bookiesTreeRef = ref(state.bookies);

export const stateRefs = ref({
  bookies: data,
  flatBookies: state.flatBookies
});

export class MoveTreeItem {
  constructor(itemId, newParentId, hoveredItemId, overUnder) {
    this.itemId = itemId;
    this.newParentId = newParentId ?? null;
    this.hoveredItemId = hoveredItemId ?? null;
    this.overUnder = overUnder ?? null;

    this.flat = [...state.flatBookies];

    this.item = this.flatItem();
    this.flatItemIndex = this.flatItemIndex();

    this.oldParentId = this.oldParentId() ?? null;
    this.oldParentIndex =  this.oldParentIndex() ?? null;
    this.newParentIndex = this.newParentIndex() ?? null;

    if (this.item.Type === "Bookmark" ||
      (
        this.newParentId != this.itemId &&
        !this.newParentIsOwnChild(this.itemId)
      )
    ) {
      if (this.oldParentId) this.removeChildFromParent();
      if (this.newParentId === 0) this.removeChildFromRoot();

      /*
      * Find the index of the hovered item after removing item \
      * in order to get the index right.
      */
      this.hoveredItemIndex = this.hoveredItemIndex() ?? null;

      if (this.hoveredItemIndex != undefined) this.appendToParentWithPosition();
      else this.appendToParent();

      this.updateGlobals();
    }
  }

  // For safekeeping when deleted from 'root'
  flatItem = () => {
    return this.flat.find(a => a.Id === this.itemId);
  };

  // Get the index of the dragged item from the flat array.
  flatItemIndex = () => {
    return this.flat.findIndex(a => a.Id === this.itemId);
  };

  /*
  * Return 'undefined' if the previous parent was 'root'.
  * Return the ID of the parent otherwise.
  */
  oldParentId = () => {
    const folders = this.flat.filter(a => a.Type === "Folder");
    const parent = folders.find(a => a.Children.includes(this.itemId));
    if (!parent) return;
    else return parent.Id;
  };

  /*
  * Return 'undefined' if the previous parent was 'root' \
  * and 'this.oldParentId' was not set because of it.
  * Return the index of the parent otherwise.
  */
  oldParentIndex = () => {
    if (this.oldParentId === null) return;
    const index = this.flat.findIndex(a => a.Id == this.oldParentId);
    if (index === -1) return;
    else return index;
  };

  /*
  * Return 'indefined' if the new parent is 'root', or the index is not found.
  * If the index is not found, even though the new parent is not 'root'; \
  * might mean there is some other issue at play.
  * Return the index of the new parent otherwise.
  */
  newParentIndex = () => {
    if (this.newParentId === 0) return;
    const index = this.flat.findIndex(a => a.Id == this.newParentId);
    if (index === -1) return;
    else return index;
  };

  // Check the type of an Bookies item.
  itemType = (id) => {
    const item = this.flat.find(a => a.Id === id);
    return item.Type;
  };

  // Check if the new parent is not its own child.
  newParentIsOwnChild = (id) => {
    const cur = this.flat.find(a => a.Id == id);

    if (cur.Children.includes(this.newParentId)) return true;

    return cur.Children.some(a => {
      if (this.itemType(a) === "Folder") {
        return this.newParentIsOwnChild(a);
      }
    });
  };

  /*
  * Return the index of the hovered-over item; if the item is hovered, \
  * in order to decide where to place the dragged item.
  */
  hoveredItemIndex = () => {
    let index;
    /*
    * If there is no given parent to move the item into; \
    * means the new parent will be 'root'.
    * Therefore seek the item index in 'root'
    */
    if (this.newParentId === 0 && this.hoveredItemId) {
      index = this.flat.findIndex(a => a.Id === this.hoveredItemId);
    } else if (this.hoveredItemId) {
      index = this.flat[this.newParentIndex].Children.indexOf(this.hoveredItemId);
    }

    if(index === -1) return;
    else return index;
  };

  // Remove the item from its parent in order to move it.
  removeChildFromParent() {
    if (this.oldParentId) {
      const index = this.flat[this.oldParentIndex].Children.indexOf(this.itemId);
      this.flat[this.oldParentIndex].Children.splice(index, 1);
    }
  }

  // Remove the item from 'root' in order to shift or delete it.
  removeChildFromRoot() {
    if (this.newParentId === 0) {
      this.flat.splice(this.flatItemIndex, 1);
    }
  }

  // If the new parent is spesified with a position, append it to that position.
  appendToParentWithPosition() {
    // Move the item down one indicy if its supposed to be UNDER a spesiffic item.
    if (this.overUnder === 'under') {
      this.hoveredItemIndex++;
    }

    // Append to 'root'.
    if (this.newParentId === 0) {
      this.flat.splice(this.hoveredItemIndex, 0, this.item);
    }

    // Append to a parent.
    else if (this.hoveredItemIndex != undefined) {
      this.flat[this.newParentIndex].Children.splice(this.hoveredItemIndex, 0, this.itemId);
    }
  }

  // If there is no spesified position to add the item, push it to the last spot.
  appendToParent() {
    // Pusing to 'root'.
    if (this.newParentId === 0) {
      this.flat.push(this.item);

    // Pusing to a parent.
    } else if (this.newParentId) {
      this.flat[this.newParentIndex].Children.push(this.itemId);
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
