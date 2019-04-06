<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu
        class="el-menu-admin"
        default-active="/user"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        :collapse="isCollapse"
        :router="true"
        active-text-color="#ffd04b">
          <el-submenu index="">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- header部分 -->
      <el-container>
        <el-header>
          <i class="el-icon-setting myicon-menu toggle-btn" @click="toogleBtn()" ></i>
          <div class="system-title">电商后台管理系统</div>
          <div>
            <span class="welcome">
            <!-- Vuex 获取用户名 -->
            {{$store.getters.getUserName}}
            </span>
            <el-button type="text" @click="logOut()">退出</el-button>
          </div>
        </el-header>
        <!-- 中间部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {getUserList} from '@/api'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  mounted () {
    let params = {params: {query: '', pagenum: 1, pagesize: 1}}
    getUserList(params).then(res => {
      console.log(res.data)
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toogleBtn () {
      this.isCollapse = !this.isCollapse
    },
    logOut () {
      localStorage.removeItem('myToken')
      this.$router.push({name: 'Login'})
    }
  }
}
</script>
<style lang='scss' scoped>
  .home {
    height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    // background: url(../assets/logo1.png);
    background-size: cover;
    background-color: #989898;
  }
  .toggle-btn {
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .logout-btn {
    color: orange;
  }
  .myicon{
    background-image: 'el-icon-setting'
  }
}
</style>
