<template>
  <div class="register-box">
      <input type="text" placeholder="请输入用户名" v-model="username" required="required"/>
      <input type="password" placeholder="请输入密码" v-model="password" required="required"/>
      <p v-if="warning.length > 1">{{warning}}</p>
      <button @click="login">登录</button>
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
        this.warning = '请输入完整信息'
      } else {
        this.warning = ''
        axios({
          method: 'post',
          url: '/api/login',
          data: {
            username: this.username,
            password: this.password
          }
        }).then((response) => {
          this.warning = response.data.msg
          if (response.data.status == 0) {
            // 跳转
            // 把token存到localStorage
            console.log(response.data.token)
            localStorage.setItem('token', response.data.token)
            this.$parent.setLogin(this.username)
            this.$router.push({path: '/'})
          }
        }).catch(() => {
          this.warning = '发生异常'
        })
      }
    }
  }
}
</script>

<style scoped>
  *{
    font-size: inherit;
  }
  .register-box input{
    display: block;
    margin: auto;
  }
  .register-box{
    text-align: center;
  }
  p{
    color: red;
    margin: 0;
  }
</style>
