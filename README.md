# Bookies
*A place to keep all your bookmarks for those of us with multiple browsers.*

I decided to make Bookies the day Mozilla had their ["Don't be evil"](https://en.wikipedia.org/wiki/Don%27t_be_evil) [moment](https://thehackernews.com/2025/03/mozilla-updates-firefox-terms-again.html),
and was looking for a new browser (as of 10.03.2024, I have still _NOT_ found a worthy successor...).

The way Firefox handles bookmarks is too good to let go...

**I simply _prefer_ the way Firefox handles bookmarks different from other browsers.**

So, here I am, trying the best to my abilities in replicating their implementation of "Bookmarks Library":

![Firefox's Bookmark Library](./img/firefox_bookmark-library.png)

---
# MVP Features -
*that are currently being worked on.*

- [ ] 0. **SELF HOSTED WITH DOCKER CONTAINER.**
- [ ] 1. Bookmarks and folders, implemented as individual *items*.
- [ ] 2. Tree-structure for folders and bookmarks hierarchy, like a file-browser.
  - [ ] 2.1 Ability to click a folder, showing the nested folders and bookmarks.
    - [ ] 2.1.1 Arrow / icon to represent if the folder is closed or open.

- [ ] 3. Drag-and drop to sort each item in the tree. This will update in the Bookies (4) file.
- [ ] 4. The "Bookies.json" file, formatted for the entire tree-structure.
  - [ ] 4.1 Ability to extract the Bookies.json file.
    - [ ] 4.1.1 Ability to edit the Bookies.json file directly to update the tree-structure.

- [ ] 5. Ability to drag-and-drop URLs into Bookies to add bookmark.
  - [ ] 5.1 Prompt to add / edit: Title, URL, Tags.
    - [ ] 5.1.1 Fall-back to defaults if the prompt is skipped.

- [ ] 6. Folder-tree separator, to separate the items in the tree.
- [ ] 7. The "Main" browser view that views the data of the items in the selected folder, falls back to the root of the hierarchy.
- [ ] 8. The "Edit Bookmark" window to edit selected item.

---
# Features -
*That will be included once the MVP is done.*

- [ ] 1. Create and add multiple users, either for different people, or different collection of bookmarks.
