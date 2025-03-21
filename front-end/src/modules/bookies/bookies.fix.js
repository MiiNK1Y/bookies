/*
* Rebuild flat Bookies to its original tree-shape.
*/


export class FlatParent {
  #parent;
  #flatArray;
  #tempArray;

  constructor(parent, flatArray, tempArray) {
    this.#parent = parent;
    this.#flatArray = flatArray;
    this.#tempArray = tempArray;

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
    if (isComplete) return true;
    throw new Error(`Error: ${this.#parent.Id} is NOT complete!`);
  };

  #prepareForWalk() {
    this.#parent.Bookmarks = [];
  }

  #prepareInflated() {
    delete this.#parent.Children;
  }

  #removeItemFromFlatArray(item) {
    this.#flatArray = this.#flatArray.filter((a) => a.Id != item.Id);
  }

  #removeItemFromTempArray(item) {
    this.#tempArray = this.#tempArray.filter((a) => a.Id != item.Id);
  }

  #flatChildItem = (childId) => {
    const flatItem = this.#flatArray.find(b => b.Id == childId);
    const tempItem = this.#tempArray.find(b => b.Id == childId);
    const item = flatItem ?? tempItem;

    if (!item) throw new Error(`Error: Flat child with ID [${childId}] ` +
      `was not found in any flat array!`);

    return item;
  };

  #walk() {
    this.#parent.Children.forEach(a => {
      const item = this.#flatChildItem(a);
      this.#removeItemFromFlatArray(item);
      this.#removeItemFromTempArray(item);

      let parent;
      switch (item.Type) {
        case "Folder":
          parent = new FlatParent(item, this.#flatArray, this.#tempArray);
          this.#flatArray = parent.flatArray;
          this.#tempArray = parent.tempArray;
          this.#parent.Bookmarks.push(parent.parent);
          break;

        case "Bookmark":
          this.#parent.Bookmarks.push(item);
          break;
      }
    });
  };

  get parent() {
    return this.#parent;
  }

  get flatArray() {
    return this.#flatArray;
  }

  get tempArray() {
    return this.#tempArray;
  }
}


export class Rebuild {
  #flatArray;
  #tempArray;
  #inflated;

  constructor(flatBookies) {
    this.#flatArray = flatBookies;
    this.#tempArray = [];
    this.#inflated = [];

    this.#rebuildFromFlat();
  }

  #removeItemFromFlatArray(item) {
    this.#flatArray = this.#flatArray.filter((a) => a.Id != item.Id);
  }

  #removeItemFromTempArray(item) {
    this.#tempArray = this.#tempArray.filter((a) => a.Id != item.Id);
  }

  #parentStillInFlatArray = (item) => {
    console.log("checking for parent of: ", item.Id);
    const parents = this.#flatArray.filter(a => a.Type == "Folder");
    const parent = parents.find(a => a.Children.includes(item.Id));
    if (parent) return true;
    else return false;
  }

  #rebuildFromFlat = () => {
    this.#flatArray.forEach(item => {
      if (!this.#flatArray.includes(item)) return;

      if (this.#parentStillInFlatArray(item)) {
        this.#tempArray.push(item);
        return;
      }

      this.#removeItemFromFlatArray(item);
      this.#removeItemFromTempArray(item);

      let parent;
      switch (item.Type) {
        case "Folder":
          parent = new FlatParent(item, this.#flatArray, this.#tempArray);
          this.#flatArray = parent.flatArray;
          this.#tempArray = parent.tempArray;
          this.#inflated.push(parent.parent);
          break;

        case "Bookmark":
          this.#inflated.push(item);
          break;
      }
    })
  };

  get inflated() {
    return this.#inflated;
  }
}
