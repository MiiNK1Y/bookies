/*
* This is where modifictaions to the Bookies structure \
* takes place.
*
* e.g:
* Flatten: for easier manipulation of the order / sorting \
* and nesting of children bookmarks.
*
* Unflatten: for when the manipulations are done and the changes \
* are overwriting the original structure.
*/


import { valid } from "./validate.js";


// Check if a parent has their assigned children.
const parentIsFilled = (folder) => {
  const bookmarkChildrenIDs = folder.Bookmarks.map(a => a.Id);
  return folder.Children.every((a) => bookmarkChildrenIDs.includes(a));
};


// Modify parent in order to prapare it for the flat array.
const preparedFlatParent = (parent) => {
  var cParent = {...parent};
  delete cParent.Bookmarks;
  cParent.Children = [];
  return cParent;
};


// Modify parent in order to prapare it for the rebuilt array.
const preparedInflatedParent = (parent) => {
  var cParent = {...parent};
  if (parentIsFilled(cParent)) {
    delete cParent.Children;
    return cParent;
  }
  else throw Error(
    `\nError: failed to check if folder with ID: ${parent.Id} is filled.\n`
  );
}


// Check if a parent is still in the flat array.
const parentStillInFlat = (flat, parent) => {
 flat.some((i) => {
  if (i.Children) return i.Children.includes(parent.Id);
  else return false;
})};


// Rebuild / inflate the flat bookies to the format the client sees.
const rebuildFromFlat = (flatBookies) => {
  let flat = [...flatBookies];
  let inflate = [];
  let temp = [];

  const walk = (folder) => {
    folder.Bookmarks = [];
    folder.Children.forEach((i) => {
      const flatItem = flat.find((j) => j.Id == i);
      if (!flatItem) {
        const tempFlatItem = temp.find((j) => j.Id == i)
      };

      if (parentStillInFlat(flat, flatItem)) {
        console.log(`parent of [${flatItem.Id}] is stil in flat!`);
        temp.push(flatItem);
        flat = flat.filter((j) => j.Id != flatItem.Id);
      }

      else if (flatItem) {

        flat = flat.filter((j) => j.Id != flatItem.Id);

        switch (flatItem.Type) {
          case "Folder":
            folder.Bookmarks.push(walk(flatItem));
            break;

          case "Bookmark":
            folder.Bookmarks.push(flatItem);
            break;
        }
      } else {
        console.log(`ID [${i}] was not found in "flat" array.`);
        const setAside = temp.find((j) => j.Id == i);
        console.log("contents of 'temp'", temp);
        if (setAside) {
          console.log(`ID [${i} was set aside, appending...]`);
          folder.Bookmarks.push(setAside)
        }
        ;
      }
    });
    return preparedInflatedParent(folder);
  };

  flat.forEach((item) => {
    const notFiltered = flat.find((i) => i.Id == item.Id);

    if (parentStillInFlat(flat, item)) {
      console.log(`parent of [${item.Id}] is stil in flat!`);
      temp.push(item);
    }
    else if (notFiltered) {
      console.log(`item [${item.Id}] is not filtered, pushing...`);

      flat = flat.filter((i) => i.Id != item.Id);

      switch(item.Type) {
        case "Folder":
        inflate.push(walk(item));
        break;

        case "Bookmark":
        inflate.push(item);
        break;
      }
    }
  });

  return inflate;
};


export const flatten = (bookies) => {
  let flat = [];

  const appendFlatItem = (item, parentId) => {
    if (parentId) {
      const parentIndex = flat.findIndex((i) => i.Id === parentId);
      flat[parentIndex].Children.push(item.Id);
    }
    flat.push(item);
  }

  function iter(bookies, parentId = null) {
    bookies.forEach((item) => {
      let flatParent;
      switch (item.Type) {

        case "Folder":
          flatParent = preparedFlatParent(item)
          appendFlatItem(flatParent, parentId);
          if (item.Bookmarks.length > 0) iter(item.Bookmarks, item.Id);
          break;

        case "Bookmark":
          appendFlatItem(item, parentId);
          break;
      }
    });
  }
  iter(bookies.Bookmarks);

  console.log("[BOOKIES] Flattened Bookies:\n", JSON.parse(JSON.stringify(flat)));
  return flat;
};


export const rebuild = (flatBookies) => {
  let modifiedBookies = {
    "Bookies version": "0.0.1",
  };
  modifiedBookies.Bookmarks = rebuildFromFlat(flatBookies);

  const bookies = new valid(modifiedBookies).valid ? modifiedBookies : null;

  if (!bookies) {
    console.log("\nError: Failed to validate Bookies file.\n");
  }
  console.log("\n[BOOKIES] Rebuilt bookies from flat!:\n", JSON.parse(JSON.stringify(bookies)));

  return bookies;
};
