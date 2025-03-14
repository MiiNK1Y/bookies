/*
* Validate if the Bookies conform to the set structure.
*
* Your Bookies may include custom properties for comments and \
* other sorts of data.
*
* BUT: Both folders and bookmarks MUST contain certain properties with \
* certain datatypes for the sake of rigidity. See bellow for both required \
* properties and their datatypes.
*/

/*
* TODO:
* - Add validation for ID: Check that it is a positive integer.
* - Add error handeling that returns some error-object with details \
*   that can be displayed in the client.
*/

export class validBookies {
  #bookiesAreValid;
  #IDs;
  constructor(bookies) {
    this.#IDs = [];

    // Fallback to 'false' if the validation fails of-the-bat \
    // due to faults outside Bookies control.
    this.#bookiesAreValid = this.#validateBookies(bookies.Bookmarks) ?? false;
  }

  // Properties both folders and bookmarks use.
  #validProps = {
    Type: "string",
    Id: "number",
    Title: "string",
  }

  // Required properties and types for bookmarks.
  #validBookmarkProps = {
    ...this.#validProps,
    URL: "string",
    Tags: "object" // Array
  }

  // Required properties and types for folders.
  #validFolderProps = {
    ...this.#validProps,
    Bookmarks: "object" // Array
  }

  // Replacing both bookmark and folder validation \
  // for this single function that can validate both.
  #validateItem = (obj, validProps) => {
    const props = Object.entries(validProps)
    for (const [property, type] of props) {
      if (
        !Object.keys(obj).includes(property) ||
        typeof obj[property] != type
      ) return false;
    }
    return true;
  }

  #validateItemId = (id) => {
    if (!this.#IDs.includes(id)) this.#IDs.push(id);
    else throw new Error(`There are two or more instances of ID: ${id}.`);
  }

  // Where all the validation and checks happen.
  #validateBookies = (bookies) => {
    return bookies.every((item) => {

      // Check for duplacate (thus invalid) IDs.
      // Throwing an error and returning false, \
      // making the Bookies invalid.
      try {
        this.#validateItemId(item.Id);
      } catch (error) {
        console.log(error);
        return false;
      }

      // Check if the current item is a Folder (contains 'Bookmarks' == Folder).
      if (item.Bookmarks) {

        // Check conformity of Folder, and the Bookmarks by recursion.
        if (item.Bookmarks.length > 0) {
          return this.#validateItem(item, this.#validFolderProps) &&
            this.#validateBookies(item.Bookmarks);
        }

        // Check conformity of the Folder imeadiately if it contains no Bookmarks.
        else return this.#validateItem(item, this.#validFolderProps);
      }

      // If the item does not contain a Bookmarks property \
      // it is assumed to be a Bookmark, check the conformity.
      else return this.#validateItem(item, this.#validBookmarkProps);
    });
  }

  get bookiesAreValid() {
    return this.#bookiesAreValid;
  }

  get validBookmarkProps() {
    return this.#validBookmarkProps;
  }

  get validFolderProps() {
    return this.#validFolderProps;
  }

  get IDs() {
    return this.#IDs;
  }
}

// Sample data for testing purposes.
//import { readFileSync } from 'node:fs';
//const data = readFileSync("./assets/samples/Bookies.json");
//const sample = JSON.parse(data);
//
//const d = new validBookies(sample);
//console.log(d.bookiesAreValid);
