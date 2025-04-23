/**
*
*
* Flatten Bookies object to a 1D array.
*
* @public
* @class
*
*
*/
export class Flatten {
  constructor(bookies) {
    this.bookies = bookies.Bookmarks;
    this.flat = [];

    this.flatten(this.bookies);
  }


  indexOfParent = (parent) => {
    return this.flat.findIndex((i) => i.Id === parent);
  };


  appendFlatItem(item, parentId) {
    if (parentId) this.flat[this.indexOfParent(parentId)].Children.push(item.Id);
    this.flat.push(item);
  }


  flatParent = (parent) => {
    var cParent = {...parent};
    delete cParent.Bookmarks;
    cParent.Children = [];
    return cParent;
  };


  flatten(items, parentId = null) {
    items.forEach((item) => {

      switch (item.Type) {
        case "Folder":
          this.appendFlatItem(this.flatParent(item), parentId);
          if (item.Bookmarks.length > 0) this.flatten(item.Bookmarks, item.Id);
          break;

        case "Bookmark":
          this.appendFlatItem(item, parentId);
          break;
      }
    });
  }
}
