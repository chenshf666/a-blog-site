import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header'
import Register from '@/components/Register'
import Login from '@/components/Login'
import writeBlog from '@/components/writeBlog'
import showBlogs from '@/components/showBlogs'
import singleBlog from '@/components/singleBlog'
Vue.use(Router)

export default new Router({
  routes: [
  {
  	path:'/',
  	name:'showBlogs',
  	component: showBlogs,
  },
  {
  	path:'/userBlogs/:author',
  	name:'userBlogs',
  	component: showBlogs,
  },
  {
    path:'/register',
    name:'Register',
    component: Register,
  },
  {
    path:'/login',
    name:'Login',
    component: Login,
  },
  {
    path:'/writeBlog',
    name:'writeBlog',
    component: writeBlog,
  },
  {
    path:'/singleBlog/:id',
    name:'singleBlog',
    component: singleBlog,
  }
  ]
})
