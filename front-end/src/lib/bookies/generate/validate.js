/**
 * @public
 * @class
 * @classdesc - Validate that the given template conforms to some rules.
 */
export class Validate {

  /**
  * @constructor
  * @param { object } template - Template with rules data, samples and rules.
  */
  constructor(template) {
    this.template = template;

    //this.validate();
  }

  /**
  * @private
  * @method
  * @desc - Recurse through the given object.
  * @param {(object|null)} obj - The object to be iterated over.
  */
  validate(obj = null) {
    console.log("")

    const arr = obj ?? this.template;

    for (const [key, value] of Object.entries(arr)) {
      switch(typeof value) {
        case "object", "array":
          this.validate(value);
          break;
        case "string", "number":
          return;
        default:
          throw new Error("Data type is not supported.")
      }
    }
  }
}
