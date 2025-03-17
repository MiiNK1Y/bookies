/*
* This is where modifictaions to the Bookies structure \
* takes place.
*
* e.g:
* Flatten: for easier manipulation of the order / sorting \
* and nesting of children bookmarks.
*
* Unflatten: for when the manipulations are done and the changes \
* are overwriting the original structure.
*/


import { valid } from "./validate.js";


export class Bookies {

  #bookies;
  #flatBookies;
  #rebuiltBookies;

  constructor(bookies) {
    this.#bookies = new valid(bookies).valid ? bookies : null;
    this.#flatBookies = [];
    this.#rebuiltBookies = [];

    if (!this.#bookies) {
      console.log("\nError: Failed to validate Bookies file.\n");
    } else {
      this.#flatten(bookies.Bookmarks);
    }
  }


  // Modifying a bookmark parent to prepare for flattening.
  #prepareFlatParent = (item) => {
    const modified = { ...item };
    if (modified.Bookmarks) delete modified.Bookmarks;
    modified.Children = [];
    return modified;
  };


  /*
  * Since the structure is flattened to a single array, \
  * each parent need to know the IDs of their children.
  * Append the 'Children' property and add the children IDs.
  */
  #appendFlatItem(item, parentId) {
    if (parentId) {
      const parentIndex = this.#flatBookies.findIndex((i) => i.Id === parentId);
      this.#flatBookies[parentIndex].Children.push(item.Id);
    }
    this.#flatBookies.push(item);
  }


  /*
  * Flatten the nested objects into a single object-array.
  * Each folder will have a nested array for the children ID's belonging to it.
  */
  #flatten(bookies, parentId = null) {
    bookies.forEach((item) => {
      switch (item.Type) {

        case "Folder":
          // Add the modified parent to the flattened array before continuing.
          this.#appendFlatItem(this.#prepareFlatParent(item), parentId);

          /*
          * Check if there are children belonging to the parent, \
          * if so, iterate over them aswell before continuing to the next item.
          */
          if (item.Bookmarks.length > 0) this.#flatten(item.Bookmarks, item.Id);
          break;

        case "Bookmark":
          this.#appendFlatItem(item, parentId);
          break;
      }
    });
  }


  #folderIsFilled = (folder) => {
    return folder.Bookmarks.every((i) => folder.Children.includes(i.Id));
  };


  #rebuildBookies() {
    let flat = [...this.#flatBookies];
    let inflate = [];
    let tempInflated = [];

    const walk = (folder) => {

      if (!folder.Bookmarks) folder.Bookmarks = [];

      folder.Children.forEach((i) => {
        const flatItem = flat.find((j) => j.Id === i);
        if (flatItem) {
          flat = flat.filter((j) => j.Id != flatItem.Id);
          switch (flatItem.Type) {

            case "Folder":
              folder.Bookmarks.push(walk(flatItem));
              break;

            case "Bookmark":
              folder.Bookmarks.push(flatItem);
              break;
          }
        } else {
          const inflated = tempInflated.find((j) => j.Id === i);
          if (inflated) folder.Bookmarks.push(inflated);
        }
      });

      if (this.#folderIsFilled(folder)) {
        delete folder.Children;
        return folder;
      } else throw Error(
        `\nError: failed to check if folder with ID: ${folder.Id} is filled.\n`
      );
    };

    flat.forEach((item) => {
      const notFiltered = flat.find((i) => i.Id == item.Id);
      if (notFiltered) {
        flat = flat.filter((i) => i.Id != item.Id);
        switch(item.Type) {

          case "Folder":
          inflate.push(walk(item));
          break;

          case "Bookmark":
          inflate.push(item);
          break;
        }
      }
    });

    this.#rebuiltBookies.push(inflate);
  }


  get bookies() {
    return this.#bookies;
  }


  set bookies(bookies) {
    this.#bookies = new valid(bookies).valid ? bookies : null;
  }


  get flatBookies() {
    return this.#flatBookies;
  }


  get rebuiltBookies() {
    this.#rebuildBookies();
    return this.#rebuiltBookies;
  }
}
