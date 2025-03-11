class Bookies {
  #bookies;
  #bookmarkPath;
  constructor(bookies) {
    this.#bookies = bookies;
    this.#bookmarkPath = [];
  }

  get bookies() {
    return this.#bookies;
  }

  set bookies(bookies) {
    this.#bookies = bookies;
  }

  get bookmarkPath() {
    return this.#bookmarkPath;
  }

  set bookmarkPath(path) {
    this.#bookmarkPath = path;
  }

  getPath(arr, id) {
    var result;
    arr.some((node, i) => {
      var temp;
      if (node.Id === id) {
        return result = `${i + 1}`;
      };
      if ((temp = this.getPath(node.Bookmarks || [], id))) {
        return result = `${i + 1}-${temp}`;
      };
    });
    return result;
  }
}
