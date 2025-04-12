<template>
  <div class="navbar">

    <RouterLink to="/browser/bookmarks">
      <img src="/src/assets/icons/list-ul-solid.svg" />
      <span>Bookmarks</span>
    </RouterLink>

    <RouterLink to="/browser/file">
      <img src="/src/assets/icons/file-code-solid.svg" />
      <span>File</span>
    </RouterLink>

    <RouterLink to="/browser/hidden">
      <img src="/src/assets/icons/ghost-solid.svg" />
      <span>Hidden</span>
    </RouterLink>

    <RouterLink to="/browser/trash">
      <img src="/src/assets/icons/trash-can-solid.svg" />
      <span>Trash</span>
    </RouterLink>

    <RouterLink to="/browser/settings">
      <img src="/src/assets/icons/gear-solid.svg" />
      <span>Settings</span>
    </RouterLink>

  </div>
</template>

<style scoped>
div.navbar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  user-select: none;
}

div.navbar>a {
  float: right;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 10px 10px 0 0;
  margin: 3px 3px 0 3px;
  font-size: 1.2em;
  color: var(--rp-text);
  text-decoration: none;
  cursor: pointer;
}

div.navbar>a.router-link-exact-active {
  position: relative;
  background-color: black;
}

div.navbar>a.router-link-exact-active:before,
div.navbar>a.router-link-exact-active:after {
  content: "";
  position: absolute;
  bottom: 0;
  height: 20px;
  width: 20px;
  background-color: var(--rp-highlight-med);
  cursor: default;
}

div.navbar>a.router-link-exact-active:before {
  left: -20px;
  border-radius: 0 0 10px 0;
  box-shadow: 5px 5px 0 0 black;
}

div.navbar>a.router-link-exact-active:after {
  right: -20px;
  border-radius: 0 0 0 10px;
  box-shadow: -5px 5px 0 0 black;
}
</style>
