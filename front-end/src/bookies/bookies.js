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
  #inflatedBookies;

  constructor(bookies) {
    this.#bookies = new valid(bookies).valid ? bookies : null;

    this.#flatBookies = [];
    this.#inflatedBookies = [];

    if (this.#bookies) {
      this.#flatten(bookies.Bookmarks);
    } else console.log("\nError: Failed to validate Bookies file.\n");
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
  * each parent need to know the IDs of their children.
  * Append the 'Children' property and add the children IDs.
  */
  // TODO: Can be written more prettier...
  #flatAppendItem(item, parentId) {
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

    this.#inflatedBookies.push(inflate);
  }


  get bookies() {
    return this.#bookies;
  }


  get flatBookies() {
    return this.#flatBookies;
  }


  get inflatedBookies() {
    this.#inflate();
    return this.#inflatedBookies;
  }
}


// Sample data for testing purposes.
import { readFileSync } from 'node:fs';
const data = readFileSync("../assets/samples/Bookies.json");
const sample = JSON.parse(data);

const d = new Bookies(sample);

console.log(d.bookies);
console.log(d.flatBookies);
console.log(d.inflatedBookies);
