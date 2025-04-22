/**
*
*
* Validate if the Bookies conform to the set structure.
*
* Your Bookies may include additional custom properties \
* for comments and other sorts of data.
*
* @public
* @class
*
*
*/
export class Validate {
  constructor(bookies) {
    this.usedIDs = [];
    this.isValid = this.valid(bookies);
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
    const ex = /^(0|[1-9]\d*)$/;
    if (!ex.test(String(id))) {
      throw Error(`Error: [ID: ${id}] ID value needs to be a positive integer.`);
    }
    else if (this.usedIDs.includes(id)) {
      throw Error(`Error: [ID: ${id}] There are two or more items with this ID.`);
    }
    else return true;
  };


  itemPropsAreValid = (item, props) => {
    for (const [property, type] of props) {
      if (!Object.keys(item).includes(property)) {
        throw Error(`Error: [ID: ${item.Id}] Missing property: [${property}]`);
      } else if (typeof item[property] != type) {
        throw Error(`Error: [ID: ${item.Id}] Unacceptable value in property: [${property}]`);
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
        throw Error(`Error: [ID: ${item.Id}] There is no written validation for item type: [${item.Type}]`);
    }
    return this.itemPropsAreValid(item, props);
  }


  validateItem = (item) => {
    try {
      var validId = this.itemIdIsValid(item.Id);
      var validProps = this.checkItemProps(item);
    } catch (error) {
      console.log(error.message);
      return false;
    }
    return validId && validProps;
  };


  valid = (folder) => {
    return folder.Bookmarks.every(item => {
      const itemValid = this.validateItem(item);
      if (!itemValid) return false;

      const hasChildren = item.Type === "Folder" && item.Bookmarks.length > 0;

      this.usedIDs.push(item.Id);

      if (hasChildren) return this.valid(item);
      else return true;
    });
  };
}
