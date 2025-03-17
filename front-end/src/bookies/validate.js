/*
* Validate if the Bookies conform to the set structure.
*
* Your Bookies may include custom properties for comments and \
* other sorts of data.
*
* BUT; both folders and bookmarks MUST contain certain properties with \
* certain datatypes for the sake of rigidity. See bellow for both required \
* properties and their datatypes.
*/


export class valid {

  #valid;
  #usedIDs;

  constructor(bookies) {
    // Keep track of all the exsisting IDs, looking for duplcates.
    this.#usedIDs = [];

    /*
    * Fallback to 'false' if the validation fails of-the-bat \
    * due to faults outside Bookies control.
    *
    * 'bookies' contains meta information about bookies, \
    * 'bookies.Bookmarks' contains the array of the items we want to validate.
    */
    this.#valid = this.#validate(bookies.Bookmarks) ?? false;
  }


  // Required properties for both folders and bookmarks.
  #validProps = {
    Type: "string",
    Id: "number",
    Title: "string"
  };


  // Required properties and types for bookmarks.
  #validBookmarkProps = {
    ...this.#validProps,
    URL: "string",
    Tags: "object" // Array
  };


  // Required properties and types for folders.
  #validFolderProps = {
    ...this.#validProps,
    Bookmarks: "object" // Array
  };


  /*
  * Check for duplacate (thus invalid) IDs.
  * Throwing an error if a duplacate is found making the Bookies invalid.
  */
  #validateItemId = (id) => {
    if (!this.#usedIDs.includes(id)) {
      this.#usedIDs.push(id);
      return true;
    }
    else throw new Error(`There are two or more instances of ID: ${id}.\n`);
  };


  /*
  * Check the properties and the type of the property.
  */
  #validateItemProps = (item) => {
    let props;

    /*
    * Validate if folder or bookmark conform to the format.
    *
    * If more item types are to be added, they need to be added here \
    * as well to be validated for conformity.
    */
    switch (item.Type) {

      case "Folder":
        props = Object.entries(this.#validFolderProps);
        break;

      case "Bookmark":
        props = Object.entries(this.#validBookmarkProps);
        break;

      default:
        throw new Error(`Item with type: "${item.Type}" is not validated!\n`);
    }

    for (const [property, type] of props) {
      if (
        !Object.keys(item).includes(property) ||
        typeof item[property] != type
      ) {
        throw new Error(
          `Item wth type: "${item.Type}" is missing property: "${property}".\n`
        );
      }
    }
    return true;
  }


  /*
  * Validate the ID and the porperties of an item.
  * Catching an error if either of them fails.
  */
  #validateItem = (item) => { try {
      var validId = this.#validateItemId(item.Id);
      var validProps = this.#validateItemProps(item);
    } catch (error) {
      console.log(error);
      return false;
    }
    return validId && validProps;
  };


  /*
  * Iterate over every object item in the Bookies array \
  * Returning a bool if the entirity of the array conforms or not.
  */
  #validate = (bookies) => {
    return bookies.every((item) => {
      const itemValid = this.#validateItem(item);

      // Return false if validation fails.
      if (!itemValid) return itemValid;

      // Recurse the children if the item is a folder, then return the result.
      if (item.Type === "Folder" && item.Bookmarks.length > 0) {
        return itemValid && this.#validate(item.Bookmarks);
      }

      // Return true if the item is valid.
      else return itemValid;
    });
  };


  get valid() {
    return this.#valid;
  }


  get validBookmarkProps() {
    return this.#validBookmarkProps;
  }


  get validFolderProps() {
    return this.#validFolderProps;
  }


  get usedIDs() {
    return this.#usedIDs;
  }
}
