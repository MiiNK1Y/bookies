// Generate property item.
class GenerateItem {
  constructor(type, min, max) {
    this.type = type;
    this.min = min;
    this.max = max;

    this.return;

    this.generate();
  }


  loremIpsumSnippet = (charAmount) => {
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing " +
      "elit. In interdum ullamcorper odio nec egestas. Aliquam consequat " +
      "ipsum id nibh rutrum elementum. Vivamus massa odio, consequat vitae " +
      "nunc non, posuere convallis massa. Aliquam sed arcu ac arcu ultrices " +
      "hendrerit viverra ac lorem. Phasellus vel hendrerit augue, at mollis " +
      "justo. Proin elementum, ante nec tempor lobortis, mauris sapien " +
      "posuere turpis, quis molestie nisl augue in est. Nullam ullamcorper " +
      "diam a diam lobortis blandit. Vivamus pretium egestas egestas. Etiam " +
      "in mi vel odio porta luctus at vitae sem. Nulla ut tellus bibendum, " +
      "suscipit leo et, placerat lectus. Vestibulum non nulla erat.";

    if (charAmount > loremIpsum.length) {
      throw new Error(`The Lorem Ipsum snippet is only ${loremIpsum.length}` +
        `characters long, ${charAmount} was requested.`);
    }

    return loremIpsum.substring(charAmount);
  }


  randomFromRange = () => {
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }


  generateLoremIpsum() {
    return this.loremIpsumSnippet(this.randomFromRange);
  }


  generateRandomItemsFromArray(array) {
    let arr = [];
    const randomFromArr = () => Math.floor(Math.random() * this.max + 1);

    for (let i = 0; i < this.randomFromRange(); i++) {
      arr.push(array[randomFromArr()]);
    }
  }


  generate() {
    switch (this.type) {
      case "$STR_LOREM_IPSUM":
        this.return = this.generateLoremIpsum();
        break;
      case "$INT_INCREMENT_GLOBAL":
        break;
      case "$ARR_RANDOM":
        this.return = this.generateRandomItemsFromArray();
        break;
      case "$STR_RANDOM":
        break;
      case "$ARR_NEST_WITH_SELF":
        break;
      default:
        break;
    }
  }
}


// Takes the item template and generates single items from it.
export class Generate {
  constructor(template, min, max) {
    this.template = template;
    this.min = min;
    this.max = max;

    this.return = [];

    this.commandKeys = [
      "$TYPE",
      "$MIN",
      "$MAX",
      "$COLLECTION"
    ];

    this.commandValues = [
      "$STR_LOREM_IPSUM",
      "$STR_RANDOM",
      "$INT_INCREMENT_GLOBAL",
      "$ARR_RANDOM",
      "$ARR_NEST_WITH_SELF"
    ];

    this.#parseTemplate();
  }


  #parseCommandValue(value) {
    switch (value) {
      case "$STR_LOREM_IPSUM":
        break;
      case "$STR_RANDOM":
        break;
      case "$INT_INCREMENT_GLOBAL":
        break;
      case "$ARR_RANDOM":
        break;
      case "$ARR_NEST_WITH_SELF":
        break;

      default:
        break
    }
  }


  #parseCommandKey(key, value) {
    switch (key) {
      case "$TYPE":
        this.#parseCommandValue(value);
        break;
      case "$MIN":
        break;
      case "$MAX":
        break;
      case "$COLLECTION":
        break;

      default:
        break;
    }
  }


  #parseTemplate() {
    // Iterate over all template items
    this.template.forEach((item) => {

      // Iterate over all properties in the item
      for (const [key, value] in Object.entries(item)) {

        let objectDefinesTemplateCommand;
        if (typeof value === "object") {
          objectDefinesTemplateCommand = Object.entries(item).some((k, v) =>
            this.commandKeys.includes(k) || this.commandValues.includes(v)
          );
        }

        if (!objectDefinesTemplateCommand) continue;

        if (this.commandKeys.containes(key)) {
          this.#parseCommandKey(key, value);
        } else if (this.commandValues.contains(value)) {
          this.#parseCommandValue(value);
        }
      }
    });
  }
}
