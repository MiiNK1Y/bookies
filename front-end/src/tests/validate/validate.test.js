import { describe, expect, test, beforeEach } from '@jest/globals';

import { Constants } from './constants';
import { Validate } from '../../lib/bookies/validate.js';

let c;
beforeEach(() => {
  c = new Constants;
})


describe("[Validate] Validate formatting of VALID Bookies object.", () => {
  test("Check small Bookies passing.", () => {
    const valid = new Validate(c.smallBookies).isValid;
    expect(valid).toBe(true);
  });

  test("Check big Bookies passing.", () => {
    const valid = new Validate(c.bigBookies).isValid;
    expect(valid).toBe(true);
  });
});


describe("[Validate] Check faulty formatting of Bookies object.", () => {
  test("Check missing 'Type' property.", () => {
    const valid = new Validate(c.bookiesMissingType).isValid;
    expect(valid).toBe(false);
  });

  test("Check missing 'Title' property.", () => {
    const valid = new Validate(c.bookiesMissingTitle).isValid;
    expect(valid).toBe(false);
  });

  test("Check missing 'Bookmarks' property.", () => {
    const valid = new Validate(c.bookiesMissingBookmarks).isValid;
    expect(valid).toBe(false);
  });

  test("Check unknown 'Type' property value.", () => {
    const valid = new Validate(c.bookiesUnknownType).isValid;
    expect(valid).toBe(false);
  });

  test("Check wrong data type in property value.", () => {
    const valid = new Validate(c.bookiesWrongDataType).isValid;
    expect(valid).toBe(false);
  });

  test("Check duplicate 'ID' value.", () => {
    const valid = new Validate(c.bookiesDuplicateId).isValid;
    expect(valid).toBe(false);
  });

  test("Check text as 'ID' value.", () => {
    const valid = new Validate(c.bookiesTextAsId).isValid;
    expect(valid).toBe(false);
  });

  test("Check negative as 'ID' value.", () => {
    const valid = new Validate(c.bookiesNegativeId).isValid;
    expect(valid).toBe(false);
  });

  test("Check float as 'ID' value.", () => {
    const valid = new Validate(c.bookiesFloatId).isValid;
    expect(valid).toBe(false);
  });
});
