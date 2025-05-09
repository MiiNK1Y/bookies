export class Generate {
  constructor(template, min, max) {
    this.template = template;
    this.min = min;
    this.max = max;

    this.tempConstructedData;
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


  loremIpsumSnippet(charAmount) {
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

    const loremIpsumLength = loremIpsum.length;

    if (charAmount > loremIpsumLength) {
      throw new Error(`The Lorem Ipsum snippet is only ${loremIpsumLength}` +
        `characters long, ${charAmount} was requested.`);
    }

    return loremIpsum.substring(charAmount);
  }


  #parseCommandKey(key) {
    switch (key) {
      case "$TYPE":
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


  #parseCommandValue() {
    //
  }


  #parseTemplate() {
    for (const item of this.template) {
      for (const [key, value] in Object.entries(this.template)) {

        const keyIsCommand = this.magicKeys.contains(key);
        const valueIsCommand = this.magicValues.contains(value);

        if (keyIsCommand) {
          this.#parseCommandKey();
        } else if (valueIsCommand) {
          //
        }
      }
    }
  }
}
