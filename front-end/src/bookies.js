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

import { validBookies } from "./validateBookies.js";

export class Bookies {
  #bookies;
  #flatBookies;
  #reInflated;
  constructor(bookies) {
    this.#bookies = new validBookies(bookies).bookiesAreValid ? bookies : null;
    this.#flatBookies = [];
    this.#reInflated = [];

    this.#flatten(bookies.Bookmarks);
  }

  // Modifying a bookmark parent to prepare for flattening.
  #flatPrepareParent = (item) => {

    // Clone the object before modifying.
    const modified = { ...item };
    if (modified.Bookmarks) delete modified.Bookmarks;
    modified.Children = [];
    return modified;
  }

  /*
  * Since the structure is flattened to a single array, \
  * each parent need to know the ID of their child.
  */
  #flatAppendItem(item, parentId) {
    if (parentId) {

      // Find the index of the already added parent folder.
      const parentIndex = this.#flatBookies.findIndex((i) => i.Id === parentId);

      // Push the child ID to the parent's children array.
      this.#flatBookies[parentIndex].Children.push(item.Id);
    }
    // Then last, push the child itself into the flattened array.
    this.#flatBookies.push(item);
  }

  /*
  * Flatten the nested objects into a single object-array.
  * Each folder will have a nested array for the children ID's belonging to it.
  */
  #flatten(bookies, parentId = null) {
    bookies.forEach((item) => {
      if (item.Type === "Folder") {

        // Add the modified parent to the flattened array before continuing.
        this.#flatAppendItem(this.#flatPrepareParent(item), parentId);

        // Check if there are children belonging to the parent, \
        // if so, iterate over them aswell before continuing to the next item.
        if (item.Bookmarks.length > 0) this.#flatten(item.Bookmarks, item.Id);
      }
      else if (item.Type === "Bookmark") this.#flatAppendItem(item, parentId);
    });
  }

  // Sort the flat array based if the object has the 'Children' prop.
  #sortFlat() {
    if (this.#flatBookies.length > 0) {
      this.#flatBookies.sort((a, b) => {
        if (a.Children && b.Children) return 0;
        if (a.Children) return -1;
        if (b.Children) return 1;
      })
    }
  }

  #inflate() {
    let flat = [...this.#flatBookies];
    let inflate = [];
    let tempInflated = [];

    const folderIsFilled = (folder) => {
      return folder.Bookmarks.every((i) => folder.Children.includes(i.Id));
    }

    const walk = (folder) => {
      if (!folder.Bookmarks) folder.Bookmarks = [];
      folder.Children.forEach((i) => {
        const flatItem = flat.find((j) => j.Id === i);
        if (flatItem) {
          flat = flat.filter((j) => j.Id != flatItem.Id);
          if (flatItem.Type === "Bookmark") {
            folder.Bookmarks.push(flatItem);
          } else if (flatItem.Type === "Folder") {
            folder.Bookmarks.push(walk(flatItem));
          }
        }
        else {
          const inflated = tempInflated.find((j) => j.Id === i);
          if (inflated) {
            folder.Bookmarks.push(inflated);
          }
        }
      })
      if (folderIsFilled(folder)) {
        delete folder.Children;
        return folder;
      }
      else throw Error("Error when checking if the folder is filled");
    };

    flat.forEach((item) => {
      const notFiltered = flat.find((i) => i.Id == item.Id);
      if (notFiltered) {
        flat = flat.filter((i) => i.Id != item.Id);
        if (item.Type === "Folder") {
          inflate.push(walk(item));
        }
        if (item.Type === "Bookmark") {
          inflate.push(item);
        }
      }
    });

    this.#reInflated.push(inflate);
  }

  get bookies() {
    return this.#bookies;
  }

  get flatBookies() {
    return this.#flatBookies;
  }

  get reInflated() {
    this.#inflate();
    return this.#reInflated;
  }
}

// Sample data for testing purposes.
import { readFileSync } from 'node:fs';
const data = readFileSync("./assets/samples/Bookies.json");
const sample = JSON.parse(data);

const d = new Bookies(sample);

console.log(d.bookies);
console.log(d.reInflated);
