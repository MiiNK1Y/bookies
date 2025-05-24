import parseTemplate from './generate2.js';

const bookies = parseTemplate(
  [{
    Type: "Bookmark",
    Id: "somebs",
    Title: {
      $TYPE: "$STR_LOREM_IPSUM",
      $MIN: 10,
      $MAX: 15
    }
  }],
  10,
  15
);

console.log(bookies);
