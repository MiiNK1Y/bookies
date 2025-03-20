/*
* Rebuild flat Bookies to its original tree-shape.
*/


export class FlatParent {
  #parent;
  #flatArray;
  #tempArray;
  #resolved;
  #error;

  constructor(parent, flatArray, tempArray, resolved) {
    this.#parent = parent;
    this.#flatArray = flatArray;
    this.#tempArray = tempArray;
    this.#resolved = resolved;
    this.#error = null;

    this.#prepareForWalk();
    if (this.#parent.Children.length > 0) {
      this.#walk();
      this.#checkComplete();
    }
    this.#prepareInflated();
  }

  #checkComplete(){
    const childrenIDs = this.#parent.Bookmarks.map(a => a.Id);
    const isComplete = this.#parent.Children.every(a => childrenIDs.includes(a));
    if (isComplete) {
      return true;
    } else {
      throw new Error(`Error: ${this.#parent.Id} is NOT complete!`);
    }
  };

  #prepareForWalk() {
    this.#parent.Bookmarks = [];
  }

  #prepareInflated() {
    delete this.#parent.Children;
  }

  #removeItemFromFlatArray(item) {
    this.#flatArray = this.#flatArray.filter((a) => a.Id != item.Id);
    this.#resolved.push(item);
  }

  #removeItemFromTempArray(item) {
    this.#tempArray = this.#tempArray.filter((a) => a.Id != item.Id);
    this.#resolved.push(item);
  }

  #flatChildItem = (childId) => {
    const flatItem = this.#flatArray.find(b => b.Id == childId);
    const tempItem = this.#tempArray.find(b => b.Id == childId);
    const item = flatItem ?? tempItem;

    if (!item) {
      throw new Error(`Error: Flat child with ID [${childId}] \
        was not found in any flat array!`);
    };

    if (flatItem) this.#removeItemFromFlatArray(item);
    else if (tempItem) this.#removeItemFromTempArray(item);

    return item;
  };

  #walk() {
    this.#parent.Children.forEach(a => {
      const item = this.#flatChildItem(a);
      switch (item.Type) {
        case "Folder":
          this.#parent.Bookmarks.push(new FlatParent(item, this.#flatArray,
            this.#tempArray, this.#resolved).parent);
          break;

        case "Bookmark":
          this.#parent.Bookmarks.push(item);
          break;
      }
    });
  };

  get parent() {
    if (this.#error) {
      return this.#error;
    } else {
      return this.#parent;
    };
  }

  get flatArray() {
    return this.#flatArray;
  }

  get tempArray() {
    return this.#tempArray;
  }
}


//export class Rebuild {
//
//  #flatBookies;
//  #tempItems;
//  #inflated;
//  //#error;
//
//  constructor(flatBookies) {
//    this.#flatBookies = flatBookies;
//    this.#tempItems = [];
//    this.#inflated = []; // NOTE:: Only bookies (tree), no meta props.
//  }
//
//  #removeItemFromFlatBookies(item) {
//    this.#flatBookies = this.#flatBookies.filter((a) => a.Id != item.Id);
//  }
//
//  #rebuildFromFlat = () => {
//    //
//  };
//
//  get bookies() {
//    return this.#inflated;
//  }
//}
