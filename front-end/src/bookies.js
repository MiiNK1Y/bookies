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
    this.#reInflated = []

    // TODO: Consider making this an inline expression to store the value.
    // like: this.#flatBookies = this.#flatten(bookies.Bookmarks).#sortFlatFolderFirst();
    this.#flatten(bookies.Bookmarks)
    this.#sortFlat();
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



  // fill the lower folders first and validate if all the children \
  // are collected before moving on to a higher level \
  // check that that the folder does NOT contain any other folders \
  // those need to be filled first!

  // Check if the item is filled.
  itemIsFilled = (item) => {
    return item.Bookmarks.every((i) => item.Children.includes(i.Id));
  }

  // Collect all the bookmarks from an item by id.
  bookmarks = (flat, folder) => {
    return flat.filter((b) => { b.Type === "Bookmark" && folder.Children.includes(b.Id) });
  }

  // Collect all children.
  folders = (flat, folder) => {
    return flat.filter((b) => { b.Type === "Folder" && folder.Children.includes(b.Id) });
  }

  // Collect all children.
  children = (flat, folder) => {
    return flat.filter((b) => { folder.Children.includes(b.Id) });
  }

  // re-inflate the object.
  inflate() {
    const flat = this.#flatBookies;

    const recur = (items, collection = []) => {
      items.forEach((item) => {
        if (item.Children) {
          if (!item.Bookmarks) item.Bookmarks = [];
          //
        }
      });
      return collection;
    }

    return recur(flat);
  }



  get bookies() {
    return this.#bookies;
  }

  get flatBookies() {
    return this.#flatBookies;
  }

  get reInflated() {
    return this.#reInflated;
  }
}

// Sample data for testing purposes.
import { readFileSync } from 'node:fs';
const data = readFileSync("./assets/samples/Bookies.json");
const sample = JSON.parse(data);

const d = new Bookies(sample);
d.inflate();
//console.log("\n\nreinflated Bookies:\n", d.reInflated);
