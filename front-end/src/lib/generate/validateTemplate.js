export class ValidateGeneratorTemplate {
  constructor(template) {
    this.template = template;

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

    this.checkTemplateType();
    this.checkTemplateItemsTypes();
    this.checkTemplateCommands();
  }


  typeKeyValueIsValid = (value) => {
    value === "$STR_LOREM_IPSUM" ||
      value === "$STR_RANDOM" ||
      value === "$ARR_RANDOM" ||
      value === "$ARR_NEST_WITH_SELF"
  };


  // $MIN only allows for positive integer numbers.
  minKeyValueIsValid = (value) => {
    (typeof value) === "Number" &&
      !(value.includes("-"))
  };


  // $MAX only allows for positive integer numbers.
  maxKeyValueIsValid = (value) => {
    (typeof value) === "Number" &&
      !(value.includes("-"))
  };


  /*
  * $COLLECTION takes an array of different values to be picked from \
  * and thus allow for pretty much anything.
  */
  collectionKeyValueIsValid = (value) => {
    (typeof value) === "Array" &&
      value.length >= 1
  };


  checkCommandKeyValuePairs(key, value) {
    const combinationError = new Error("ERROR: the command combination: " +
      `${key, value} is not a valid combination.`);

    switch (key) {
      case "$TYPE":
        if (!this.typeKeyValueIsValid(value)) throw combinationError;
        break;
      case "$MIN":
        if (!this.minKeyValueIsValid(value)) throw combinationError;
        break;
      case "$MAX":
        if (!this.maxKeyValueIsValid(value)) throw combinationError;
        break;
      case "$COLLECTION":
        if (!this.collectionKeyValueIsValid(value)) throw combinationError;
        break;
      default:
        return;
    }
  }


  // Check that the given template is an array.
  checkTemplateType() {
    if ((typeof this.template) !== "Array") {
      throw new Error("ERROR: The given template need to be in an array.");
    }
  }


  // Check that all items in the given template array is an object.
  checkTemplateItemsTypes() {
    for (const item of this.template) {
      if ((typeof item) !== "Object") {
        throw new Error("ERROR: All items in a template array need to be " +
          "defined by an object.");
      }
    }
  }


  checkTemplateCommands() {
    for (const item of this.template) {
      const itemKeys = Object.keys(item);
      const itemValues = Object.values(item);

      for (const [key, value] in Object.entries(item)) {
        this.checkCommandKeyValuePairs(key, value);
      }
    }
  }
}
