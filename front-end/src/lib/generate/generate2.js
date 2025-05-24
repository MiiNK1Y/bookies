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

const LOREM_IPSUM_CHAR_LIMIT = 2000;

const KEY_COMMANDS = [
  "$TYPE",
  "$COLLECTION",
  "$MIN",
  "$MAX"
];

const VALUE_COMMANDS = [
  "$STR_LOREM_IPSUM",
  "$STR_RANDOM",
  "$INT_INCREMENT_GLOBAL",
  "$ARR_RANDOM",
  "$ARR_NEST_WITH_SELF"
];


const randomIntFromRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;


const loremIpsumFromLength = (len) => {
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
}


const randomizedArrayWithSetLength = (array, length) => {
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(array[Math.floor(Math.random() * length)]);
  }
};


export default function parseTemplate(template, length) {
  let generated = [];
  template.forEach((item) => {
    for (const [key, value] in Object.entries(item)) {
      if (typeof value != "object") continue;
      const objectDefinesTemplateCommand = Object.entries(item).some((k, v) =>
        KEY_COMMANDS.includes(k) || VALUE_COMMANDS.includes(v));
      if (!objectDefinesTemplateCommand) continue;
      generated.push(new item(key, value).return);
    }
  });
  return generated;
}


class Key {
  constructor(templateItem, min, max, increment) {
    this.templateItem = templateItem;
    this.min = min;
    this.max = max;
    this.increment = increment ?? null;
    this.return;

    switch (templateItem["$TYPE"]) {
      case "$STR_LOREM_IPSUM":
        this.return = loremIpsumFromLength(
          randomIntFromRange(this.min, this.max)
        );
        break;

      case "$STR_RANDOM":
        this.return = randomizedArrayWithSetLength(
          this.templateItem["$COLLECTION"], 1
        )[0];
        break;

      case "$INT_INCREMENT_GLOBAL":
        break;

      case "$ARR_RANDOM":
        this.return = randomizedArrayWithSetLength(
          this.templateItem["$COLLECTION"],
          randomIntFromRange(this.min, this.max)
        );
        break;

      case "$ARR_NEST_WITH_SELF":
        break;
      default:
        break;
    }
  }
}

class Type extends Key {
  constructor(templateItem, min, max) {
    super(templateItem, min, max);
  }
}

class Collection extends Key {
  constructor(templateItem, min, max) {
    super(templateItem, min, max);
  }
}

class Value {
  constructor() {
    //
  }
}

class StringLoremIpsum extends Value {
  constructor() {
    //
  }
}

class StringRandom extends Value {
  constructor() {
    //
  }
}

class IntIncrementGlobal extends Value {
  constructor() {
    //
  }
}

class ArrRandom extends Value {
  constructor() {
    //
  }
}

class ArrNestWithSelf extends Value {
  constructor() {
    //
  }
}
