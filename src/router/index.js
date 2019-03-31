import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'Loging',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
  ]
})
