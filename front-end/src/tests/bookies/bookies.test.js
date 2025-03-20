import { describe, expect, test, afterEach, beforeEach, jest } from '@jest/globals';

//import { longFlatParent } from './Bookies.flat..json';
//import { longBookies } from './Bookies.json';

const flatParent = {
  Type: 'Folder',
  Id: 1,
  Title: 'Some Folder Name Here',
  Children: [ 2, 3, 4, 6]
};

const flatChildren = [
  {
    Type: 'Bookmark',
    Id: 2,
    Title: 'Has Id 1, bit short',
    URL: 'https://wikipedia.com',
    Tags: [ 'Information', 'Info' ]
  },
  {
    Type: 'Bookmark',
    Id: 3,
    Title: 'Has Id 2',
    URL: 'https://alnyk.pages.dev',
    Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
  },
  {
    Type: 'Folder',
    Id: 4,
    Title: 'Some Folder Name Here',
    Children: [ 5 ]
  },
  {
    Type: 'Bookmark',
    Id: 5,
    Title: 'Has Id 2',
    URL: 'https://alnyk.pages.dev',
    Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
  },
  {
    Type: 'Bookmark',
    Id: 6,
    Title: 'Has Id 1, bit short',
    URL: 'https://wikipedia.com',
    Tags: [ 'Information', 'Info' ]
  },
];

const flatChildrenScrambled = [
  {
    Type: 'Bookmark',
    Id: 5,
    Title: 'Has Id 2',
    URL: 'https://alnyk.pages.dev',
    Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
  },
  {
    Type: 'Folder',
    Id: 4,
    Title: 'Some Folder Name Here',
    Children: [ 5 ]
  },
  {
    Type: 'Bookmark',
    Id: 6,
    Title: 'Has Id 1, bit short',
    URL: 'https://wikipedia.com',
    Tags: [ 'Information', 'Info' ]
  },
  {
    Type: 'Bookmark',
    Id: 3,
    Title: 'Has Id 2',
    URL: 'https://alnyk.pages.dev',
    Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
  },
  {
    Type: 'Bookmark',
    Id: 2,
    Title: 'Has Id 1, bit short',
    URL: 'https://wikipedia.com',
    Tags: [ 'Information', 'Info' ]
  }
];

const flatParentTestInflated = {
  "Type": "Folder",
  "Id": 1,
  "Title": "Some Folder Name Here",
  "Bookmarks":
    [
      {
        "Type": "Bookmark",
        "Id": 2,
        "Title": "Has Id 1, bit short",
        "URL": "https://wikipedia.com",
        "Tags": ["Information", "Info"]
      },
      {
        "Type": "Bookmark",
        "Id": 3,
        "Title": "Has Id 2",
        "URL": "https://alnyk.pages.dev",
        "Tags": ["Personal", "Portfolio", "Personal Project"]
      },
      {
        "Type": 'Folder',
        "Id": 4,
        "Title": 'Some Folder Name Here',
        "Bookmarks":
          [
            {
              "Type": 'Bookmark',
              "Id": 5,
              "Title": 'Has Id 2',
              "URL": 'https://alnyk.pages.dev',
              "Tags": [ 'Personal', 'Portfolio', 'Personal Project' ]
            },
          ]
      },
      {
        "Type": 'Bookmark',
        "Id": 6,
        "Title": 'Has Id 1, bit short',
        "URL": 'https://wikipedia.com',
        "Tags": [ 'Information', 'Info' ]
      }
    ]
};

const flatChildrenMissingItem = [
  {
    Type: 'Bookmark',
    Id: 2,
    Title: 'Has Id 1, bit short',
    URL: 'https://wikipedia.com',
    Tags: [ 'Information', 'Info' ]
  },
  {
    Type: 'Bookmark',
    Id: 3,
    Title: 'Has Id 2',
    URL: 'https://alnyk.pages.dev',
    Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
  },
  {
    Type: 'Folder',
    Id: 4,
    Title: 'Some Folder Name Here',
    Children: [ 5 ]
  },
  {
    Type: 'Bookmark',
    Id: 5,
    Title: 'Has Id 2',
    URL: 'https://alnyk.pages.dev',
    Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
  },
];



import { FlatParent } from '../../modules/bookies/bookies.fix';

describe("FlatParent rebuilds a folder-item into its original shape.", () => {

  let cFlatParent;

  beforeEach(() => {
    cFlatParent = {...flatParent};
  })

  test("Rebuilding from regular flat.", () => {
    const cFlatChildren = [...flatChildren];
    const rebuilt = new FlatParent(cFlatParent, cFlatChildren, [], []).parent;
    expect(rebuilt).toEqual(flatParentTestInflated);
  });

  test("Rebuilding from scrambled flat.", () => {
    const cFlatChildrenScrambled = [...flatChildrenScrambled];
    const rebuilt = new FlatParent(cFlatParent, cFlatChildrenScrambled, [], []).parent;
    expect(rebuilt).toEqual(flatParentTestInflated);
  });

  test("Rebuilding from scrambled flat, one missing nested bookmark.", () => {
    const cFlatChildrenMissingItem = [...flatChildrenMissingItem];
    expect(() => {
      new FlatParent(cFlatParent, cFlatChildrenMissingItem, [], []).parent;
    }).toThrow();
  });
});
