<template>
  <div class="outer">
    <div class="nav">
      <router-link to='/' exact>首页</router-link>
      <router-link to='/writeBlog' exact>写博客</router-link>
      <router-link to='/register' v-if='!hasLogin' exact>注册</router-link>
      <router-link to='/login' v-if='!hasLogin' exact>登录</router-link>
      <router-link v-if='!!hasLogin' :to='"/userBlogs/"+hasLogin' exact>{{hasLogin}}</router-link>
      <span v-if='!!hasLogin' @click='logout'><a href="javascript:void(0)">注销</a></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: ['hasLogin'], // 使用父组件传来的值判断是否处于登录状态
  methods: {
    // 注销很简单，把全局变量isLogin设置为空字符串，同时移除用作身份验证的token
    logout () {
      this.$parent.setLogin('')
      localStorage.removeItem('token')
    }
  }

}
</script>

<style>
  .outer{
    display: flex;
    justify-content: center;
    z-index: 1;
    background: #55F;
    margin: 0;
    padding: 0.5em;
  }
  .outer a{
    padding: 0.2em;
    color: white;
    text-decoration: none;
    border-radius: 0.2em;
  }
  .outer .router-link-active{
    background:rgba(255,255,255,0.8);
    color: #444;
  }
</style>
