//import { describe, expect, test } from '@jest/globals';

const flatParent = {
  Type: 'Folder',
  Id: 1,
  Title: 'Some Folder Name Here',
  Children: [ 2, 3, 4]
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
  }
];

const flatChildrenScrambled = [
  {
    Type: 'Folder',
    Id: 4,
    Title: 'Some Folder Name Here',
    Children: [ 5 ]
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
    Id: 5,
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
      }
    ]
};

//import { FlatParent } from '../../modules/bookies/bookies.fix';

const FlatParent = require("../../modules/bookies/bookies.fix");

//const FlatParentData = new FlatParent.FlatParent(flatParent, flatChildren, [], []).parent;
//test("Testing FlatParent tree building (in order)", () => {
//  expect(FlatParentData).toEqual(flatParentTestInflated);
//});

const FlatParentDataScrambled = new FlatParent.FlatParent(flatParent, flatChildrenScrambled, [], []).parent;
test("Testing FlatParent tree building (scrambled order)", () => {
  expect(FlatParentDataScrambled).toEqual(flatParentTestInflated);
});
