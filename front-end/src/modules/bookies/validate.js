/*
* Validate if the Bookies conform to the set structure.
*
* Your Bookies may include aditional custom properties \
* for comments and other sorts of data.
*/

export class Valid {
  constructor(bookies) {
    this.isValid = false;
    this.usedIDs = [];

    this.valid(bookies.Bookmarks);
  }

  props = {
    Type: "string",
    Id: "number",
    Title: "string"
  };

  bookmarkProps = {
    ...this.props,
    URL: "string",
    Tags: "object"
  };

  folderProps = {
    ...this.props,
    Bookmarks: "object"
  };

  itemIdIsValid = (id) => {
    if (
      !this.usedIDs.includes(id) || // Check for duplicate ID.
      !Number(id).isNaN() ||        // Check if ID is a number.
      !id.startsWith("-")           // Check if ID is not negative.
    ) {
      return true;
    }
    else throw new Error(`There are two or more instances of ID: ${id}.\n`);
  };

  itemPropsAreValid = (item, props) => {
    for (const [property, type] of props) {
      if (
        !Object.keys(item).includes(property) ||
        typeof item[property] != type
      ) {
        throw new Error(`Item wth type: "${item.Type}" is missing property: "${property}".\n`);
      }
    }
    return true;
  }

  checkItemProps = (item) => {
    let props;
    switch (item.Type) {
      case "Folder":
        props = Object.entries(this.folderProps);
        break;

      case "Bookmark":
        props = Object.entries(this.bookmarkProps);
        break;

      default:
        throw new Error("There is no written validation for item with type: ", item.Type);
    }
    return this.itemPropsAreValid(item, props);
  }

  validateItem = (item) => {
    try {
      var validId = this.itemIdIsValid(item.Id);
      var validProps = this.checkItemProps(item);
    } catch (error) {
      console.log(error);
      return false;
    }
    return validId && validProps;
  };

  valid(bookies) {
    this.isValid = bookies.every((item) => {

      const itemValid = this.validateItem(item);
      if (!itemValid) return false;

      this.usedIDs.push(item.Id);

      if (item.Type === "Folder" && item.Bookmarks.length > 0) {
        return itemValid && this.valid(item.Bookmarks);
      }
      else return itemValid;
    });
  };
}
