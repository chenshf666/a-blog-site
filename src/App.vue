<template>
  <div id="app">
    <Header :hasLogin='isLogin'></Header>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'App',
  components: {
    Header,
    Login
  },
  data () {
    return {
      // 全局变量，用于判断是否处于登录状态，如果是空字符串，说明未登录
      isLogin: sessionStorage.getItem('isLogin')
    }
  },
  methods: {
    // 提供给子组件使用的方法，用于确认是否处于登录状态
    setLogin (username) {
      this.isLogin = username
      sessionStorage.setItem('isLogin', username)
    }
  },
  mounted () {
    // 渲染后发出清求，服务区通过token确认用户的登录状态，并返回
    // 用户名供前端使用
    axios({
      method: 'post',
      url: '/api/validate',
      data: {
        token: localStorage.getItem('token') || ''
      }
    }).then((response) => {
      // 状态0说明身份验证成功
      if (response.data.status == 0) {
        this.setLogin(response.data.username)
      }
    }).catch((err) => {
      console.error(err)
    })
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body{
  background-color: #F5F6F7;
}
@media only screen and (min-width: 500px){
  #app{
    font-size: 25px; /*全局字体大小, 子组件则使用rem来动态适应*/
  }

}

</style>
