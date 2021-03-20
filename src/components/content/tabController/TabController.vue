<template>
  <div class="tab-controller">
    <div v-for="(item ,index) in titles" class="tab-controller-item"
    :class="{active: index ===currentIndex }" @click="clickItem(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabController",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    clickItem(index) {
      this.currentIndex=index;
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.tab-controller {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  background-color: #fff;
}
.tab-controller-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
  padding: 5px;
}
</style>
