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
              setTimeout(()=>{this.$router.push('/login')},1000)
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
  margin: auto;
  box-sizing: border-box;
}

.register-input{
  display: block;
  box-sizing: border-box;
}

.register-box .register-button{
  box-sizing: border-box;
}

.login-tip{
  text-align: center;
}
.login-tip a{
  text-decoration: none;
}

@media only screen and (min-width: 1200px){
  .register-box{
    width: 24em;
    padding: 3em 6em 3em 6em;
    margin-top: 1em;
  }
  
  .register-input{
    font-size: 0.5em;
    width: 24em;
    margin-bottom: 1em;
  }
  
  .register-box .register-button{
    font-size: 0.5em;
    width: 24em;
  }
  .login-tip a{
    font-size: 0.5em;
  }
}
@media only screen and (max-width: 1200px) and (min-width: 600px){
  .register-box{
    width: 24em;
    padding: 3em 6em 3em 6em;
    margin-top: 1em;
  }
  
  .register-box .register-input{
    font-size: 0.5em;
    width: 24em;
    margin-bottom: 1em;
    display: block;
  }
  
  .register-box .register-button{
    font-size: 0.5em;
    width: 24em;
  }
  .login-tip a{
    font-size: 0.5em;
  }
}
@media only screen and (max-width: 600px){
  .register-box{
    width: 90%;
    margin-top: 1em;
    padding-top: 3em;
    padding-bottom: 3em;
  }
  
  .register-box .register-input{
    font-size: 0.5em;
    width: 80%;
    margin: auto;
    margin-bottom: 1em;
    display: block;
  }
  
  .register-box .register-button{
    display: block;
    font-size: 0.5em;
    width: 80%;
    margin: auto;
  }
  .login-tip a{
    font-size: 0.5em;
  }
}
</style>
