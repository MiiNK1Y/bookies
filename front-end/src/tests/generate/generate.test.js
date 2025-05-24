import { describe, expect, test, beforeEach } from '@jest/globals';

import { Generate } from '../../lib/generate/generate.js';

let template;

let templateInvalidCommand;

let templateSmallBookmark;
let templateSmallBookmarkResolved;
beforeEach(() => {
  template = [
    {
      Type: "Bookmark",
      Id: "$INT_INCREMENT_GLOBAL",
      Title: {
        $TYPE: "$STR_LOREM_IPSUM",
        $MIN: 10,
        $MAX: 15
      },
      URL: {
        $TYPE: "$STR_RANDOM",
        $COLLECTION: [
          "https://vg.no",
          "https://tek.no",
          "https://wikipedia.com",
          "https://thehackernews.com"
        ]
      },
      Tags: {
        $TYPE: "$ARR_RANDOM",
        $COLLECTION: [
          "some",
          "random",
          "tags",
          "to",
          "choose",
          "from"
        ],
        $MIN: 0,
        $MAX: 5
      }
    },
    {
      Type: "Folder",
      Id: "$INT_INCREMENT_GLOBAL",
      Title: {
        $TYPE: "$STR_LOREM_IPSUM",
        $MIN: 10,
        $MAX: 15
      },
      Bookmarks: {
        $TYPE: "$ARR_NEST_WITH_SELF",
        $MIN: 0,
        $MAX: 10
      }
    }
  ];

  templateInvalidCommand = [
    {
      Type: "Folder",
      Id: "$THIS_COMMAND_IS_FAULTY",
      Title: {
        $TYPE: "$STR_LOREM_IPSUM",
        $MIN: 10,
        $MAX: 15
      },
      Bookmarks: {
        $TYPE: "$ARR_NEST_WITH_SELF",
        $MIN: 0,
        $MAX: 10
      }
    }
  ];

  templateSmallBookmark = [
    {
      Type: "Bookmark",
      Id: "$INT_INCREMENT_GLOBAL",
      Title: {
        $TYPE: "$STR_LOREM_IPSUM",
        $MIN: 10,
        $MAX: 15
      }
    }
  ];
});

describe("Check generation of small Bookies array.", () => {
  test("Check generation of single string object generation", () => {
    const bookies = new Generate(templateSmallBookmark);
    expect(bookies).toEqual()
  });

  // NOTE: Note done yet...
  xtest("Check small template generation.", () => {
    const bookies = new Generate(template);
    expect(bookies).toEqual(true);
  });
});
