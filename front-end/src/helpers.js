/**
 * Shrink the width of a containers text to fit-to-content.
 * Solution used here sourced from:
 * https://stackoverflow.com/questions/14596213/shrink-div-to-text-thats-wrapped-to-its-max-width/78307608#78307608
 *
 * @public
 * @function shrinkWrap
 * @param {Object} element - The object resulting from 'querySelector'.
 */
export function shrinkWrap(element) {
  const { firstChild, lastChild } = element;

  // If the element or the properties does not exist, return.
  if (!element || !firstChild || !lastChild) return;

  const range = document.createRange();
  range.setStartBefore(firstChild);
  range.setEndAfter(lastChild);
  const { width } = range.getBoundingClientRect();

  // Set new spec values for the element.
  element.style.maxWidth = width + "px";
  element.style.boxSizing = "content-box";

  // debug
  console.log(`Shrink-wrapped: ${element.innerHTML}`);
};

/**
 * Shrink-wrap every item in a given object element array.
 *
 * @public
 * @function shrinkWrapAll
 * @param {Object[]} elements - The objects resulting from 'querySelectorAll'.
 */
export function shrinkWrapAll(elements) {
  elements.forEach(element => {
    shrinkWrap(element);
  });
};
