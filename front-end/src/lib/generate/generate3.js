/*
* template example
* [
*   {
*     Type: "Bookmark",
*     Id: "$INT_INCREMENT_GLOBAL",    // Incrementing integer, will \
*                                     // increment on each item with the same value.
*     Title: {
*       $TYPE: "$STR_LOREM_IPSUM",    // Renadom length of Lorem Ipsum.
*       $MIN: 10,                     // Minimum length of Lorem Ipsum.
*       $MAX: 15                      // Maximum length of lorem Ipsum.
*     }
*   },
*   {
*     URL: {
*       $TYPE: "$STR_RANDOM",         // Pick a random string from a given array.
*       $COLLECTION: [                // The collection to pick from, depending on the $TYPE.
*         "https://some.site1.com",
*         "https://some.site2.com",
*         "https://some.site3.com"
*       ]
*     }
*   },
*   {
*     Type: "Folder",
*     Id: "$INT_INCREMENT_GLOBAL",
*     Title: {
*       $TYPE: "$STR_LOREM_IPSUM",
*       $MIN: 10,
*       $MAX: 15
*     },
*     Bookmarks: {
*       $TYPE: "$ARR_NEST_WITH_SELF", // This item can nest items like itself and other template \
*       $MIN: 0,                      // items within itself, creating a recursive item.
*       $MAX: 10
*     }
*   }
* ]
*/

/*
*************
* Constants *
*************
*/
const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing " +
  "elit. In interdum ullamcorper odio nec egestas. Aliquam consequat " +
  "ipsum id nibh rutrum elementum. Vivamus massa odio, consequat vitae " +
  "nunc non, posuere convallis massa. Aliquam sed arcu ac arcu ultrices " +
  "hendrerit viverra ac lorem. Phasellus vel hendrerit augue, at mollis " +
  "justo. Proin elementum, ante nec tempor lobortis, mauris sapien " +
  "posuere turpis, quis molestie nisl augue in est. Nullam ullamcorper " +
  "diam a diam lobortis blandit. Vivamus pretium egestas egestas. Etiam " +
  "in mi vel odio porta luctus at vitae sem. Nulla ut tellus bibendum, " +
  "suscipit leo et, placerat lectus. Vestibulum non nulla erat.";

// Some cap on how long the Lorem Ipsum string can be.
const LOREM_IPSUM_CHAR_LIMIT = 2000;

// The key commands that can be used to define a template command.
const KEY_COMMANDS = [
  // What type of data should be created.
  "$TYPE",
  // The collection of items that can be picked from.
  "$COLLECTION",
  // The minimum amount of either characters or array items.
  "$MIN",
  // The maximim amount of either characters or array items.
  "$MAX"
];

// The value commands that can be used in pair with key commands.
const VALUE_COMMANDS = [
  // The data should be some length of Lorem Ipsum.
  "$STR_LOREM_IPSUM",
  // The data should be some random string picked from a collection.
  "$STR_RANDOM",
  // The data should be an integer incrementing for each created item.
  "$INT_INCREMENT_GLOBAL",
  // The data should be a randomized array with its items picked from a given collection. \
  // The length of the array is randomized from some minimum and maximim amount.
  "$ARR_RANDOM",
  // The data should be an array that is capable of nesting items withing itself, \
  // as well as other iterations of itself.
  "$ARR_NEST_WITH_SELF"
];

/*
*****************
* The generator *
*****************
*/
class Generate {
  constructor(template, amount, increment) {
    this.template = template;           // The template to create items by.
    this.amount = amount;               // The amount of items that should be created.

    /* A way to keep track of the iterations if the $INT_INCREMENT_GLOBAL command is used.
    The iteration may start from a given number, but if none is given the default is 0. */
    this.increment = increment ?? 0;

    this.return;                        // The value to be returned in the end.

    this.#parse();
  }


  // Return a random integer picked from between two ranges.
  #randomIntFromRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;


  // Return a snipped of Lorem Ipsum.
  #loremIpsumSnippet = (len) => {
    if (len > LOREM_IPSUM_CHAR_LIMIT) {
      throw Error(`Error: The current character limit for a Lorem Ipsum string ` +
        `is ${LIMIT}, either raise the limit, or request a shorter Lorem Ipsum.`);
    }
    if (len > LOREM_IPSUM.length) {
      let loremIpsumExtended = LOREM_IPSUM;
      while (len > loremIpsumExtended.length) {
        loremIpsumExtended.concat(" ", LOREM_IPSUM);
      }
      return loremIpsumExtended.substring(len);
    }
    return LOREM_IPSUM.substring(len);
  };


  // Return a array with random items picked from a array of items.
  #randomizedArray = (array, length) => {
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(array[Math.floor(Math.random() * length)]);
    }
    return arr;
  };


  // Parse a single template item.
  #parseTemplateItem() {
    //
  }


  // Check whether a key or its value defines the item as a command.
  #objectDefinesCommand = (obj) =>
    Object.entries(obj).some((pair) =>
      pair.some((a) =>
        KEY_COMMANDS.includes(a) ||
        VALUE_COMMANDS.includes(a)
      ));


  // Parse the entire template.
  #parse() {
    this.template.forEach((item) => {
      for (const value in Object.values(item)) {
        if (
          typeof value != "object" ||
          !this.#objectDefinesCommand(value)
        ) continue;
        this.#parseTemplateItem(value);
      }
    });
  }
}
