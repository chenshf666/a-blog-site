<template>
  <div @scroll="getMore" class="showBlogs_test" ref='blogs_ref'>
    <div class="showBlogs_zhanwei"></div>
    <div v-if="$route.params.author" class="showBlogs_blog_desc" style="font-weight: bolder;text-align: center;">
      {{$route.params.author}}的博客
    </div>
    <div v-for="(blog, index) in blogs" :key='index'>
        <div class="showBlogs_blog_desc">
          <router-link :to="'/singleBlog/'+blog.id">
            <span class="showBlogs_blog_title">{{blog.title}}</span>
            <span class='showBlogs_blog_content'>{{blog.content | toChunjing}}</span>
            <span class="showBlogs_blog_author">
              <router-link :to="'/userBlogs/'+blog.author">
                {{blog.author}}
              </router-link>
            </span>
          </router-link>
          <span
            class="showBlogs_blog_delete"
            @click='delete_blog(index, blog.id)'
            v-if="$route.params.author && $route.params.author === isLogin">
            <a href="javascript:void(0)">删除</a>
          </span>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'showBlogs',
  data () {
    return {
      blogs: [],
      page: 0,
      timer: null,
      isLogin: sessionStorage.getItem('isLogin'),
      getAll: false // 如果获取到的数据长度为0，说明已经读取完了，没有必要去再做get请求了
    }
  },
  methods: {
    getMore () {
      var bls = this.$refs.blogs_ref
      if (bls.scrollTop + bls.clientHeight >= bls.scrollHeight && !this.getAll) {
        axios({
          method: 'get',
          url: '/api/get_blogs',
          params: {
            page: this.page,
            author: this.$route.params.author || ''
          }
        }).then((response) => {
          response.data.forEach((item) => {
            this.blogs.push(item)
          })
          this.page++
          if (response.data.length == 0) {
            this.getAll = true
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    delete_blog (index, id) {
      this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'post',
          url: '/api/delete_blog',
          data: {
            id: id,
            token: localStorage.getItem('token') || ''
          }
        }).then((response) => {
          switch (response.data.status) {
            case 0:
              this.$message({type: 'success', showClose: true, message: '删除成功'})
              this.blogs.splice(index, 1)
              this.$forceUpdate()
              break
            case 1:
              this.$parent.setLogin('')
              this.$message({type: 'error', showClose: true, message: '身份验证失败，请重新登录'})
              break
            case 2:
              this.$message({type: 'error', showClose: true, message: '发生异常，请重试'})
              break
          }
        }).catch((err) => {
          this.$message({type: 'error', showClose: true, message: '发生异常，请重试'})
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          showClose: true
        })
      })
    }
  },
  mounted () {
    axios({
      method: 'get',
      url: '/api/get_blogs',
      params: {
        page: this.page,
        author: this.$route.params.author || ''
      }
    }).then((response) => {
      this.blogs = response.data
      this.page++
    }).catch((err) => {
      console.log(err)
    })
  },
  filters: {
    toChunjing (str) {
      str = str.replace(/<[^>]+>/g, '').replace(/<.*$/, '')
      return str.slice(0, 33) + '...'
    }
  }
}

</script>

<style>
.showBlogs_test .showBlogs_zhanwei{
  height: 3em;
}
.showBlogs_test{
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
  top: 0;
  left: 0;
  z-index: -1;
}
.showBlogs_blog_desc{
  box-sizing: border-box;
  padding: 1em;
  width: 32em;
  /*height: 5em;*/
  margin: auto;
  margin-top: 2px;
  position: relative;
  background-color: white;
}
.showBlogs_blog_desc a{
  text-decoration: none;
  color: black;
}

.showBlogs_blog_author{
  display: inline-block;
  font-size: 0.8em;
}
.showBlogs_blog_author a:hover{
  color: blue;
}
.showBlogs_blog_title{
  font-weight: bolder;
  position: relative;
}
.showBlogs_blog_content{
  position: relative;
  display: block;
  color: #AAA;
  font-size: 0.8em;
}
.showBlogs_blog_desc .showBlogs_blog_delete a{
  visibility: hidden;
}
.showBlogs_blog_desc:hover .showBlogs_blog_delete a{
  visibility: visible;
}
.showBlogs_blog_delete a{
  font-size: 0.8em;
  color: red;
  float: right;
}

@media only screen and (max-width: 1200px){
  .showBlogs_blog_desc{
    width: 100%;
  }
}
</style>
