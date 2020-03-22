<template>
  <div class="register-box">
      <input type="text" placeholder="请输入用户名" v-model="username" required="required"/>
      <input type="password" placeholder="请输入密码" v-model="password1" required="required"/>
      <input type="password" placeholder="请确认密码" v-model="password2" required="required"/>
      <p v-if="warning.length > 1">{{warning}}</p>
      <button @click="register">注册</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password1: '',
      password2: '',
      warning: '',
    }
  },
  methods: {
    register () {
      if (this.username == '' || this.password1 == '' || this.password2 == '') {
        this.warning = '请输入完整信息';
      } else if (this.password1 != this.password2) {
        this.warning = '两次密码输入不一致';
      } else {
        this.warning  = '';
        axios({
          method: 'post',
          url: '/api/register',
          data:{
            username: this.username,
            password: this.password1
          }
        }).then((response)=>{
          this.warning = response.data;
          
        }).catch(()=>{
          this.warning = '发生异常';
        })
      }
    }
  }
}
</script>

<style scoped>
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
