import Vue from 'vue'
import VueRouter from "vue-router"

// 添加这下面一段代码，就可以解决报错,解决路由重复报错问题，下面为push与replace跳转路由的解决方案
const originalPush = VueRouter.prototype.push;
const originalReplace =VueRouter.prototype.replace;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
};
//组件懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')

//安装插件
Vue.use(VueRouter)

//创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
    routes,
  mode: 'history'
})

//导出
export default router
