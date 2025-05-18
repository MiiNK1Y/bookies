import { describe, expect, test, beforeEach } from '@jest/globals';

import { ValidateGeneratorTemplate } from '../../lib/generate/validateTemplate.js';

let template;
let templateInvalidCommand;
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
});


describe("Validate generator template", () => {
  test("Check small template passing.", () => {
    const valid = new ValidateGeneratorTemplate(template).valid;
    expect(valid).toBe(true);
  });

  test("Check faulty template value.", () => {
    expect(() => {
      new ValidateGeneratorTemplate(templateInvalidCommand);
    }).toThrow(new Error(`ERROR: "$THIS_COMMAND_IS_FAULTY" is not a valid value command.`));
  });
});
