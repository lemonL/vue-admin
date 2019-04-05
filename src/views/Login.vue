<template >
  <div class="login">
    <el-form ref="formName"
             :model="form"
             :rules="rules"
             class="container">
      <el-form-item>
        <div class="avatar">
          <img src="@/assets/logo.png">
        </div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="form.username"
                  placeholder="账户"
                  prefix-icon="el-icon-mobile-phone"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password"
                  placeholder="密码"
                  type="password"
                  prefix-icon="el-icon-edit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn"
                   @click="loginPost('formName')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { checkUser } from '@/api'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在3到5个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginPost (form) {
      // 校验输入框
      this.$refs[form].validate(valid => {
        if (valid) {
          checkUser(this.form).then(res => {
            console.log(res)
            // 如果成功
            if (res.meta.status === 200) {
              // 将token保存到localStorage
              localStorage.setItem('myToken', res.data.token)
              this.$router.push({name: 'Home'})
            } else {
              this.$message({
                message: '用户名或密码错误',
                type: 'warning'
              })
            }
          })
        } else {
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f4f5f4;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    box-sizing: border-box;
    border: 10px solid #fff;
    border-radius: 1%;
    box-shadow: 0 1px 5px #ccc;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
