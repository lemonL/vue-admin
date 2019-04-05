// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 全局路由守卫，用于防止未登录用户跳转
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('myToken')
  // 主页面先判断一下是否有token存在，如果不存在，就进入路由判断逻辑
  if (token) {
    next()
  } else {
    // 当前的路径path不等于login，就跳转到login
    if (to.path !== '/login') {
      next({ path: '/login' })
    } else {
      // 否则就不干涉
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
