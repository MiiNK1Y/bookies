class validBookies {

  // Private properites.
  #validBookmarkProps;
  #validFolderProps;

  constructor(bookies) {
    this.bookies = this.validateBookies(bookies) ? bookies : null;

    this.#validBookmarkProps = {
      Type: "string",
      Id: "number",
      Title: "string",
      URL: "string",
      Tags: "object" // array
    }

    this.#validFolderProps = {
      Type: "string",
      Id: "number",
      Title: "string",
      Bookmarks: "object" // array
    }
  }

  // Check that the Bookies file conforms to the format.
  validateBookies(bookies) {
    bookies.every(item => {

      // If the item is a folder, it should contain bookmarks, \
      // iterate over those if the array is not empty.
      if (item.Bookmarks && item.Bookmarks.length > 0) {
        return this.validateBookies(item.Bookmarks);
      }

      // If the item is a bookmark, \
      // or a folder without bookmark, check if either is valid.
      else return this.#validateFolder(item) || this.#validateBookmark(item)
    });
  }

  #validateBookmark(bookmark) {
    for (const property in bookmark) {
      if (
        !this.#validBookmarkProps.keys().includes(property) ||
        typeof bookmark[property] != this.#validBookmarkProps[property]
      ) return false;
    }
    return true;
  }


  #validateFolder(folder) {
    for (const property in folder) {
      if (
        !this.#validFolderProps.keys().includes(property) ||
        typeof folder[property] != this.#validFolderProps[property]
      ) return false;
    }
    return true;
  }

}

export class Bookies {
  #bookies;
  constructor(bookies) {
    this.#bookies = bookies;
  }

  get bookies() {
    return this.#bookies;
  }

  set bookies(bookies) {
    this.#bookies = bookies;
  }

  // Flatten the nested objects into a single object-array.
  // Each folder will have a nested array for the ID's belonging to it.
  flatten() {
    const flat = [];

    // Recursive function to deep-dive into nested objects.
    function walk(bookmarks, id) {
      for (var item of bookmarks) {

        // - If the item does NOT have a 'children' property, the item is a bookmark.
        // - If the item DOES have the 'children' property, but it's empty, \
        // there is no data that needs processing.
        if (!item.children || item.children === 0) {
          flat.push(item);
        };

        if (item.children.length === 0) {
          //
        }
      }
    }
  }

  // Unflatten the array into what the file originaly was, \
  // but with the new changes made by client.
  unflatten() {
    //
  }
}
