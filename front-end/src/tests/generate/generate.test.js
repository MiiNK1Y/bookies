import { describe, expect, test } from '@jest/globals';
import { Generate } from '../../lib/bookies/generate/generate.js';

let template;
beforeEach(() => {
  template = {
    item: {
      url: {
        min: 20,
        max: 30,
        samples: ["https://url", "http://url"]
      },
      tags: {
        min: 2,
        max: 15,
        samples: ["tag", "tags"]
      }
    },

    nestable: {
      title: {
        min: 10,
        max: 20,
        samples: ["example", "example"]
      },
      tags: {
        min: 2,
        max: 15,
        samples: ["tag", "tags"]
      },
      children: {
        min: 3,
        max: 10,
        samples: [self]
      }
    }
  };
})


describe("[Demo data] Build a demo bookies object.", () => {
  xtest("Check and validate the formatting.", () => {
    const valid = new Generate(template);
    expect(valid).toBe(true);
  });
});
