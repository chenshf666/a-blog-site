<template>
  <div class="register-box">
      <el-input placeholder="请输入用户名" v-model="username" class='register-input'/></el-input>
      <el-input placeholder="请输入密码" v-model="password" show-password class='register-input'/></el-input>
      <el-button @click="login" class='register-button' type='primary'>登录</el-button>
      <div class="login-tip"><router-link to='/register'>还没有账号？点此注册</router-link></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      warning: ''
    }
  },
  methods: {
    login () {
      if (this.username == '' || this.password == '') {
        this.$message({type:'warning',showClose:true, message:'请输入完整信息'})
      } else {
        axios({
          method: 'post',
          url: '/api/login',
          data: {
            username: this.username,
            password: this.password
          }
        }).then((response) => {
          switch (response.data.status) {
            case 0:
              localStorage.setItem('token', response.data.token)
              this.$parent.setLogin(this.username)
              this.$router.push({path: '/'})
              // 跳转
              // 把token存到localStorage
              break
            case 1:
              this.$parent.setLogin('')
              this.$message({type: 'error', showClose: true, message: '用户名不存在或者密码错误'})
              break
            case 2:
              this.$message({type: 'error', showClose: true, message: '发生异常，请重试'})
              break
          }
          if (response.data.status == 0) {
            
            
          }
        }).catch(() => {
          this.$message({type:'warning',showClose:true, message:'发生异常，请重试'})
        })
      }
    }
  }
}
</script>

<style>
.register-box{
  background: white;
  border: 1px solid #AAA;
  width: 24em;
  margin: auto;
  box-sizing: border-box;
  padding: 3em 6em 3em 6em;
  margin-top: 1em;
}

.register-input{
  font-size: 0.5em;
  width: 24em;
  display: block;
  box-sizing: border-box;
  margin-bottom: 1em;
}

.register-button{
  font-size: 0.5em;
  width: 24em;
  box-sizing: border-box;
}

.login-tip{
  text-align: center;
}
.login-tip a{
  text-decoration: none;
  font-size: 0.2em;
}
</style>
