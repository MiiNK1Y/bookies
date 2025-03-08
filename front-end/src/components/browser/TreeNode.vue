<script>
export default {
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      required: true
    },
    spacing: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showChildren: false
    }
  },
  computed: {
    nodeMargin() {
      return {
        'margin-left': `${this.spacing}px`
      }
    },
    hasChildren() {
      const { Bookmarks } = this.node;
      return Bookmarks && Bookmarks.length > 0;
    },
    toggleChildrenIcon() {
      return this.showChildren ?
        '/src/assets/icons/point_down.svg' :
        '/src/assets/icons/point_right.svg'
    }
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren
    }
  },
}
</script>


<template>
  <div class="node" :style="nodeMargin">
    <img
      :src="toggleChildrenIcon"
      v-if="hasChildren"
      @click="toggleChildren"
      @keypress="toggleChildren"
    />
    <span>{{ node.Title }}</span>
  </div>
  <div v-if='hasChildren' v-show="showChildren">
    <TreeNode
      v-for="child in node.Bookmarks"
      :key="child.id"
      :node="child"
      :spacing="spacing + 20"
    />
  </div>
</template>


<style scoped>
div.node {
  height: fit-content;
  width: fit-content;
  padding: 5px 9px;
  border-radius: 5px;
  margin: 5px;
  background-color: var(--rp-highlight-med);
}
</style>
