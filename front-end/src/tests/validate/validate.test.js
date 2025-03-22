import { describe, expect, test, beforeEach } from '@jest/globals';
import { Constants } from './samples/constants';
import { Valid } from '../../modules/bookies/validate.js';
  import data from './samples/Bookies.json';

let c;
beforeEach(() => {
  c = new Constants;
})


describe("[Validate] Validate formatting of VALID Bookies object.", () => {
  test("Check small Bookies passing.", () => {
    const valid = new Valid(c.smallBookies).isValid;
    expect(valid).toBe(true);
  });

  test("Check big Bookies passing.", () => {
    const valid = new Valid(c.bigBookies).isValid;
    expect(valid).toBe(true);
  });
});

describe("[Validate] Check faulty formatting of Bookies object.", () => {
  test("Check missing 'Type' property.", () => {
    const valid = new Valid(c.bookiesMissingType).isValid;
    expect(valid).toBe(false);
  });

  test("Check missing 'Title' property.", () => {
    const valid = new Valid(c.bookiesMissingTitle).isValid;
    expect(valid).toBe(false);
  });

  test("Check missing 'Bookmarks' property.", () => {
    const valid = new Valid(c.bookiesMissingBookmarks).isValid;
    expect(valid).toBe(false);
  });

  test("Check unknown 'Type' property value.", () => {
    const valid = new Valid(c.bookiesUnknownType).isValid;
    expect(valid).toBe(false);
  });

  test("Check wrong data type in property value.", () => {
    const valid = new Valid(c.bookiesWrongDataType).isValid;
    expect(valid).toBe(false);
  });

  test("Check duplicate 'ID' value.", () => {
    const valid = new Valid(c.bookiesDuplicateId).isValid;
    expect(valid).toBe(false);
  });

  test("Check text as 'ID' value.", () => {
    const valid = new Valid(c.bookiesTextAsId).isValid;
    expect(valid).toBe(false);
  });

  test("Check negative as 'ID' value.", () => {
    const valid = new Valid(c.bookiesNegativeId).isValid;
    expect(valid).toBe(false);
  });

  test("Check float as 'ID' value.", () => {
    const valid = new Valid(c.bookiesFloatId).isValid;
    expect(valid).toBe(false);
  });
});
