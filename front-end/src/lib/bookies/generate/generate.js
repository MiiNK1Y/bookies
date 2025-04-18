/**
* @public
* @class
* @classdesc - Generate a randomized Bookies object for testing.
*/
export class Generate {

  /**
  * @constructor
  *
  * @param {array} template - Array of objects that define the template.
  * const example = {
  *
  *   item: {
  *     url: {
  *       min: 20,
  *       max: 30,
  *       samples: ["https://url", "http://url"]
  *     },
  *     tags: {
  *       min: 2,
  *       max: 15,
  *       samples: ["tag", "tags"]
  *     }
  *   },
  *
  *   nestable: {
  *     title: {
  *       min: 10,
  *       max: 20,
  *       samples: ["example", "example"]
  *     },
  *     tags: {
  *       min: 2,
  *       max: 15,
  *       samples: ["tag", "tags"]
  *     },
  *     children: {
  *       min: 3,
  *       max: 10,
  *       samples: [self]
  *     }
  *   }
  * }
  *
  * @param {number} min - The minimum length of the array, nested items included.
  * @param {number} max - The maximum length of the array, nested items included.
  * @param {number} minDepth - The minimum depth of nesting.
  * @param {number} maxDepth - The maximum depth of nesting.
  */
  constructor(template, min, max, minDepth, maxDepth) {
    this.template = template;
    this.min = min;
    this.max = max;
    this.minDepth = minDepth;
    this.maxDepth = maxDepth;

    this.tree = [];

    // this.build();
  }

  /**
  * @private
  * @desc - Fill each item with the given samples.
  * @param {object} item - An item from the given template.
  */
  fill(item) {
    let builtItem = { ...item };
    for (const [key, value] in Object.entries(item)) {
      //
    }
  }

  /**
  * @private
  * @desc - Build the new tree.
  */
  build() {
    //
  }
}
