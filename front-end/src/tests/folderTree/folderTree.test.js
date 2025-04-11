import { describe, expect, test, beforeEach } from '@jest/globals';
import { Constants } from './constants.js';
import { MoveTreeItem, state } from '../../stores/folderTree.js';

let c;
beforeEach(() => {
  c = new Constants;
  state.bookies = c.bookies;
  state.flatBookies = c.flatBookies;
})

describe("[MoveTreeItem] Rebuild Bookies after moved item.", () => {
  test("Moved Bookmark ID [3] from Folder ID [1] to Folder ID [4].", () => {
    new MoveTreeItem(3, 4);
    expect(state.bookies).toEqual(c.bookiesMovedItem);
  });
});
