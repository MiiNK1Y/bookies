# Bookies
*A place to keep all your bookmarks independent from browsers.*

I made decided to make Bookies the day Mozilla had their "Don't be evil" moment,
and decided to look for a new browser (as of 10.03.2024, I have still not decided...).

The browser I was looking for all had something in common; 
They failed to separate the bookmarks into some sort of independent window, the way I like it.

**I simply _prefer_ the way Firefox handles bookmarks.**

So, here I am, trying the best in my abilities to replicate their implementation of the "Bookmarks Library".

![Firefox's Bookmark Library](./img/firefox_bookmark-library.png)

---
# MVP Features -
*that are currently being worked on.*

- [ ] 0. **SELF HOSTED WITH DOCKER CONTAINER.**
- [ ] 1. Both bookmarks and folders, both implemented as individual *items*.
- [ ] 2. Tree-structure for folders and bookmarks hierarchy, like a file-browser.
  - [ ] 2.1 Ability to click a folder, showing the nested folders and bookmarks.
    - [ ] 2.1.1 Arrow / icon to represent if the folder is closed or open.

- [ ] 3. Drag-and drop to sort each item in the tree. This will update in the Bookies (4) file.
- [ ] 4. The "Bookies.json" file for the entire tree-structure.
  - [ ] 4.1 Ability to extract the Bookies.json file.
    - [ ] 4.1.1 Ability to edit the Bookies.json file directly to update the tree-structure.

---
# Features -
*That will be included once the MVP is done.*

- [ ] 1. Create and add multiple users, either for different people, or different collection of bookmarks.
