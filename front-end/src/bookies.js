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
  constructor(bookies) {
    this.#bookies = new validBookies(bookies).bookiesAreValid ? bookies : null;
    this.#flatBookies = [];
    this.#flatten(bookies.Bookmarks);
  }

  // Modifying a bookmark parent to prepare for flattening.
  #preparedParent = (item) => {

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
  #appendChild(item, parentId) {
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
        this.#appendChild(this.#preparedParent(item), parentId);

        // Check if there are children belonging to the parent, \
        // if so, iterate over them aswell before continuing to the next item.
        if (item.Bookmarks.length > 0) this.#flatten(item.Bookmarks, item.Id);
      }
      else if (item.Type === "Bookmark") this.#appendChild(item, parentId);
    });
  }

  /*
  * Unflatten the array into what the file originaly was, \
  * but with the new changes made by client.
  */
  #unflatten() {
    //
  }

  get bookies() {
    return this.#bookies;
  }

  get flatBookies() {
    return this.#flatBookies;
  }
}

// Sample data for testing purposes.
import { readFileSync } from 'node:fs';
const data = readFileSync("./assets/samples/Bookies.json");
const sample = JSON.parse(data);

const d = new Bookies(sample);
console.log(d.flatBookies);
