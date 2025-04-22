import { describe, expect, test, beforeEach } from '@jest/globals';

import { Constants } from './constants.js';
import { Move } from '../../lib/bookies/move.js';
import { Rebuild } from '../../lib/bookies/rebuild.js';
import { state, bookies } from '../../stores/bookies.js';

let c;
beforeEach(() => {
  c = new Constants;
  bookies.regular = c.bookies;
  bookies.flat = c.flatBookies;
})

describe("[MoveTreeItem] Rebuild Bookies after moved item.", () => {
  test("Moved Bookmark ID [3] from Folder ID [1] to Folder ID [4].", () => {
    const update = new Move(bookies.flat, 3, 4).update;
    const rebuilt = new Rebuild(update).bookies;
    expect(rebuilt).toEqual(c.bookiesMovedItem);
  });
});
