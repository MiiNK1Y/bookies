import { describe, expect, test, beforeEach } from '@jest/globals';
import { Constants } from './constants';
import { Rebuild, FlatParent } from '@/modules/bookies/bookies.js';

let c;
beforeEach(() => {
  c = new Constants;
})


describe("[FlatParent] Rebuilds a folder-item into its original shape.", () => {
  test("Rebuilding regular flat parent.", () => {
    const rebuilt = new FlatParent(c.flatParent, c.flatChildren).parent;
    expect(rebuilt).toEqual(c.flatParentInflated);
  });

  test("Rebuilding scrambled flat parent.", () => {
    const rebuilt = new FlatParent(c.flatParent, c.flatChildrenScrambled).parent;
    expect(rebuilt).toEqual(c.flatParentInflated);
  });

  test("Rebuilding scrambled flat, one missing + nested bookmark.", () => {
    expect(() => {
      new FlatParent(c.flatParent, c.flatChildrenMissingItem, [], []).parent;
    }).toThrow();
  });
});


describe("[Rebuild] Rebuilds a Bookies bookmarks array to its original shape.", () => {
  test("Rebuilding from root of flat Bookies array.", () => {
    const rebuilt = new Rebuild(c.flatBookies).inflated;
    expect(rebuilt).toEqual(c.bookiesInflated);
  })

  test("Rebuilding from root of scrambled flat Bookies array.", () => {
    const rebuilt = new Rebuild(c.scrambledFlatBookies).inflated;
    expect(rebuilt).toEqual(c.bookiesInflated);
  })
});


describe("[Big Rebuild] Rebuilds a big Bookies bookmarks array to its original shape.", () => {
  test("Rebuilding from root of flat Bookies array.", () => {
    const rebuilt = new Rebuild(c.bigFlatBookies).inflated;
    expect(rebuilt).toEqual(c.bigBookiesInflated);
  })
});

describe("[Complete Bookies] Rebuilds a flat Bookies into Bookies with meta information", () => {
  test("Rebuilding complete (with meta tags) Bookies from flat.", () => {
    const rebuilt = new Rebuild(c.flatBookies).bookies;
    expect(rebuilt).toEqual(c.completeBookies);
  })
});
