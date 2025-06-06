# Bookies
*A place to keep all your bookmarks for those of us with multiple browsers.*

I decided to make Bookies the day Mozilla had their ["Don't be evil"](https://en.wikipedia.org/wiki/Don%27t_be_evil) [moment](https://thehackernews.com/2025/03/mozilla-updates-firefox-terms-again.html),
and was looking for a new browser (as of 10.03.2024, I have still _NOT_ found a worthy successor...).

The way Firefox handles bookmarks is too good to let go...

**I simply _prefer_ the way Firefox handles bookmarks different from other browsers.**
**Except for the mobile version, that implementation _sucks_.**

So, here I am, trying the best to my abilities in replicating their implementation of "Bookmarks Library":

![The General Idea](./img/bookies_browser_dashboard.png)

![Firefox's Bookmark Library](./img/firefox_bookmark-library.png)

---
# MVP Features -
*that are currently being worked on.*

- [ ] 0. **SELF HOSTED WITH DOCKER CONTAINER.**
- [x] 1. Bookmarks and folders, implemented as individual *items*.
- [x] 2. Tree-structure for folders and bookmarks hierarchy, like a file-browser.
  - [x] 2.1 Ability to click a folder, showing the nested folders and bookmarks.
    - [x] 2.1.1 Arrow / icon to represent if the folder is closed or open.

- [ ] 3. Drag-and drop to sort each item in the tree. This will update in the Bookies (4) file.
- [ ] 4. The "Bookies.json" file, formatted for the entire tree-structure.
  - [ ] 4.1 Ability to extract the Bookies.json file.
    - [ ] 4.1.1 Ability to edit the Bookies.json file directly to update the tree-structure.
- [ ] 5. Drag-and-drop multiple items.
  - [ ] 5.1 Select collection of neighboring indices with shift-click.
  - [ ] 5.2 Select items far apart (non-neighbor indices) with control-click.

- [ ] 6. Ability to drag-and-drop URLs into Bookies to add bookmark.
  - [ ] 6.1 Prompt to add / edit: Title, URL, Tags.
    - [ ] 6.1.1 Fall-back to defaults if the prompt is skipped.

- [ ] 7. Folder-tree separator, to separate the items in the tree.
- [ ] 8. The "Main" browser view that views the data of the items in the selected folder, falls back to the root of the hierarchy.
- [ ] 9. The "Edit Bookmark" window to edit selected item.

---
# Features -
*that will be included once the MVP is done.*

- [ ] 1. Create and add multiple users, either for different people, or different collection of bookmarks.
- [ ] 2. Password-protected bookmarks and folders.
- [ ] 3. Hidden _and_ Password-protected bookmarks and folders.
- [ ] 4. Toggle ability to keep folders permanently open, showing internal items. Parents can close, but wont affect toggled folders once reopening the parent.
- [ ] 5. Bookmarks-tree "grabbable" sliding width-adjustment.
- [ ] 6. Selection of color themes.
- [ ] 7. Keyboard navigation for both file-tree and main browser view.
- [ ] 8. Search function (with keyboard shortcut as well).

---
# Features -
*for the far future.*

- [ ] 1. Extension for popular browsers to add Bookies as a default bookmarks manager replacement. Simply login to the extension and have access to your bookmarks across all _supported_ browsers.

- [ ] 2. Sharing hub to share your Bookies collection with others ("sources for my artice", "my favorite websites", "favorite receipes" etc...)
  - [ ] 2.1 "TOP BOOKIES" e.g.

---
# My Notes During development
### 2025.03.10
- [22:28] Make some damn script to populate and randomize the Bookies.json file for demonstration and testing.
- [22.47] Was thinking "The Bookies.json file does not need ID's to identify bookmarks and folders, so maybe apply the ID's when parsing the file, then remove them again when the user exports the file.", but then considered that ID's can be used to identify the order of which the bookmark / folder was added to the collection. Great for "sort by last added" feature.
- [22.51] Some way to go about "selected folder showing the bookmarks in main browser view" and "selected bookmark showing the editing window for that bookmark": \
> - When clicking on a folder, place the ID and meta-data in localstorage for a component watcher to update the main browser view. \
> - Same for bookmarks, but with the editing window.
> **OR**
> - Similar technique, but instead of localstorage, use a Vue databank for global data storage (Pinia or some other tech?).

### 2025.03.11
*Going about drag-and-drop.*
Things to keep in mind:
- Indication to show where the dragged element will be dropped.
- Handling adjusting elements after the drop is done (mostly automatic DOM features?).
- Writing that change to the new Bookies JSON data (both in memory and for the Bookies.json file).

- [22:05] Keep looking for a native Vue implementation, which seems troublesome.
  - I have looked into the following methods:
    - Native Vue implementation that works when moving from one _static_ folder to another, and sorting inside those. That case did _not_ cover the case of nested folders with objects, but might be the right track.
    - "vuedraggable", a 5 year old library for Vue 3 that is now broken and throws error during a _simple_ implementation.

  - I'm considering looking into:
    - Creating a class for getting and setting data for an instance of bookies.
      - Getting the nested dot-path for the wanted item during dragging, to work with the object directly, and removing it from said spot when dropped.
      - Getting the position and path of the folder when hovering and dropping the item, placing the object into that nested folder (needs better planning here...).

    - An implementation with vanilla HTML, but only looked at the surface here, might be a better implementation.

### 2025.03.12
- [14:33] It looks like I might be able to follow the standard Vue way for drop-down functionality.
  - By traversing the Bookies.json file and flattening it into a simple object-array, where each folder-item has a nested array with ID's of the children belonging to it.
    - This way, generating DOM elements for the folders and dropping the items into it should be trivial, as well as making the Vue template.
  - I'll start by making a class to parse the Bookies.json file and flatten it.
  - Then I'll add some rules to verify that all the items conforms to the Bookies rules and throw an error if it doesn't (adding it for client-safety).
  - [18:02] How to go about the positions? How to know one should go before another in a folder? A 'position' id?
    - Maybe, when flattening the Bookies.json file, assign a 'position' ID, and using it when unflattening the object to determine position?
      - This will then have to be modified during the "drop" operation of drag-and-drop.

### 2025.03.13
- [20:23] Damn, managed to actually create a flattening algo in less than a day, and even managed to implement some okayish error-handeling in the Bookies format validation. Good for my standards, kinda hyped.

### 2025.03.14
- [12:08] Going about inflating a flattened nested object array:
  - Keep in mind:
    - Per item:
      - Figure out if it has a parent.
      - Figure out if it has a child.
      - Seek for that child and append it to itself.
        - Remember to modify the object accordingly (add 'Bookmarks', remove 'Children').
      - Appending the deepest nested children to its parent before working itself outwards.

      - Perhaps add a "Folder: ID" property to each item when flattening?
        - This allows for checking it we have to iterate further over the array to find out if the ID is related to a bookmark or folder.

### 2025.03.18
- [14:01] Since the "inflate" functionality is now complete, and I now can rebuild a modified flat array, I need to figure out how to actually update the folder tree to show those change.
  - I have tried:
    - Emitting the entire modified flat array, only for emit() to do something funky and not actually emit the created modified array, but some other version of it i cant figure out how...
    - Move the instance to its own file and then import ref()'s into the folderTree and the nodes, only to have issues actually setting the new data.

  - I'm now going to try and implement Pinia for state management. Where methods can be implemented to modify the data, and then the changes should be applied automatically by Vue.
    - Wait, maybe Pinia is not needed after all? Checking the Vue documentation; entire arrays may be replaced, and Vue will only re-render items that actually changed.

### 2025.03.21
- [21:21] Damn I've been productive.
  - The tree is now applying changes when they happen, but the reason it worked was because of the shallow nature of emit(). There is a bug that passes an item when drag-and-droped into a nested folder, through all the parents and end up in the root folder. This is because the event listeners for each item assumes the drop was meant for them and takes it from their child folder until it reaches the root parent. To avoid this, i need to disable event propagation, but that makes emits not work, since emits used their parent to pass the data.
  - So I'll be checking out Pinia to handle that action. I was looking at "Provide / Inject", but it appears that is meant for parent-to-child communication, and not vice-versa.

### 2025.03.27
- [11:00] note on 2025.03.21; Pinia was not needed, instead i created a "Composable" in a "store" directory to manipulate the Bookies, both file and DOM tree (DOM tree applied after the ref() changes value).
- note on 2025.03.11/12; I ended up using the native HTML5 drag-and-drop feature (with Vue's template abstraction, ofcourse). The event created on drag-event stores the ID of the dragged item, and the event created on drop-event stores the ID of the parent the child was meant to go in. The actual functionality aside from the DOM stuff, is from-the-bottom made JavaScript without any external library or modules.

### 2025.04.01
- [10:12] Completed the hover-dragged-item-over-folder-to-open feature (with a 500ms delay). Had to setup the ability to cancel the timer with the returned ID from setTimout(), as well as create a hover-mask to sit between the top and bottom mask that are used to show the drop-hint.
- Now, im starting on the main-view of the browser view, where the contents of a folder will show, as well as the information of a single selected bookmark (on the bottom of the same view).
- Some things to keep in mind when creating said view:
  - Some way to keep tabs on the selected TreeItem folder. (a state within this component? a store?)
  - Some way to keep tabs on the selected item in this view (to show the relevant information).
  - When double clicking a folder in this view, move to that folder (don't open it in this view).
  - Highlight the selected folder in the BookmarksTreeView, to know where in the structure we are.
