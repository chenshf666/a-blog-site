<template>
  <div class="register-box">
      <el-input placeholder="请输入用户名" v-model="username" class='register-input'/></el-input>
      <el-input placeholder="请输入密码" v-model="password1" show-password class='register-input'/></el-input>
      <el-input placeholder="请确认密码" v-model="password2" show-password class='register-input'/></el-input>
      <el-button @click="register" class='register-button' type='primary'>注册</el-button>
      <div class="login-tip"><router-link to='/login'>已经有账号了？点此登录</router-link></div>
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
        this.$message({type:'warning',showClose:true, message:'请输入完整信息'})
      } else if (this.password1 != this.password2) {
        this.$message({type:'warning',showClose:true, message:'两次密码输入不一致'})
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
          switch (response.data.status) {
            case 0:
              this.$message({type: 'success', showClose: true, message: '注册成功'})
              break
            case 1:
              this.$parent.setLogin('')
              this.$message({type: 'error', showClose: true, message: '用户名已经被注册'})
              break
            case 2:
              this.$message({type: 'error', showClose: true, message: '发生异常，请重试'})
              break
          }
          
        }).catch(()=>{
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
