<template>
  <div class="wrapper" ref="aaa">
    <ul class="content">
      <li>列表1</li>
      <li>列表2</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表6</li>
      <li>列表5</li>
      <li>列表4</li>
      <li>列表3</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Category",
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector('.wrapper'),{
      probeType: 3,
      pullUpLoad: true,

    })
    this.scroll.on('scroll', (position) => {
      // console.log(position);
    })
    //下拉加载更多
    this.scroll.on('pullingUp',() => {
    })

  },
  methods: {

  }
}
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;

  overflow: hidden;
}
</style>
