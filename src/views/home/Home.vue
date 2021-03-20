<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3"
            @scroll="contentScroll"
            @pullingUp="pullingUp"
            :pull-up-load="true">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-views></feature-views>
      <tab-controller :titles="['流行','新款','精选']" class="tab-controller"
                      @tabClick="tabClick"></tab-controller>
      <gods-list :goods="showGoods"></gods-list>
      <div id="blank-controller"></div>
    </scroll>
    <!-- 组件监听要加native -->
    <bock-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TabController from "@/components/content/tabController/TabController";
import GodsList from "@/components/content/goods/GodsList";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import FeatureViews from "@/views/home/childComps/FeatureViews";
import Scroll from "@/components/common/scroll/Scroll";
import BockTop from "@/components/content/backTop/BockTop";


import {getHomeMultidata, getHomeGoods} from "@/network/home";


export default {
  name: "Home",
  components: {
    NavBar,
    TabController,
    GodsList,
    HomeSwiper,
    HomeRecommendView,
    FeatureViews,
    Scroll,
    BockTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  created() {
    //
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /**
     * 事件监听
     *
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
    },
    pullingUp() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh()
    },

    /**
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  }

}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 9;
}

.tab-controller {
  /*position: relative;*/
  /*z-index: 9;*/
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

#blank-controller {
  height: 50px;
  line-height: 50px;
}


</style>
