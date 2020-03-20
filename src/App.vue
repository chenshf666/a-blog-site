<template>
  <div id="app">
    <Header :hasLogin='isLogin'></Header>
    <router-view />
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
      isLogin: sessionStorage.getItem('isLogin')
    }
  },
  methods: {
    setLogin (username) {
      this.isLogin = username
      sessionStorage.setItem('isLogin', username)
    }
  },
  mounted () {
    axios({
      method: 'post',
      url: '/api/validate',
      data: {
        token: localStorage.getItem('token') || ''
      }
    }).then((response) => {
      if (response.data.status == 0) {
        this.isLogin = response.data.username
      }
    }).catch((err) => {
      console.error(err)
    })
  }
}
</script>

<style>
  #app {
    font-size: 24px;
  }
</style>
