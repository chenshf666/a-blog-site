<template>
  <div class="outer">
    <div class="nav">
      <router-link to='/'>首页</router-link>
      <router-link to='/writeBlog'>写博客</router-link>
      <router-link to='/hello'>个人中心</router-link>
      <router-link to='/register' v-if='!hasLogin'>注册</router-link>
      <router-link to='/login' v-if='!hasLogin'>登录</router-link>
      <router-link v-if='!!hasLogin' to='/hello'>{{hasLogin}}</router-link>
      <span v-if='!!hasLogin' @click='logout'>注销</span>
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
  props: ['hasLogin'],
  methods: {
    logout () {
      this.$parent.setLogin('')
      localStorage.removeItem('token')
    }
  }

}
</script>

<style scoped>
  .outer{
    display: flex;
    justify-content: center;
    z-index: 1;
    background: white;
  }

</style>
