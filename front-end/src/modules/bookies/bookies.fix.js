/*
* Rebuild flat Bookies to its original tree-shape.
*/


class FlatParent {
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
    if (this.#parent.Children.length > 0) this.#walk();
    this.#prepareInflated();
  }

  #isComplete() {
    const childrenIDs = parent.Bookmarks.map(a => a.Id);
    const isComplete = parent.Children.every(a => childrenIDs.includes(a));
    if (isComplete) {
      return true;
    } else {
      this.#error = new Error(`Error: ${this.#parent.Id} is NOT complete!`);
      return false;
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

  #walk() {
    this.#parent.Children.forEach(a => {
      const flatItem = this.#flatArray.find(b => b.Id == a);
      const tempItem = this.#tempArray.find(b => b.Id == a);
      const item = flatItem ?? tempItem;

      if (flatItem) this.#removeItemFromFlatArray(item);
      else if (tempItem) this.#removeItemFromTempArray(item);

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


module.exports = { FlatParent };
