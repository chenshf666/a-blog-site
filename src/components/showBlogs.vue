<template>
  <div @scroll="getMore" class="test" ref='blogs_ref'>
    <div class="zhanwei"></div>
    <div v-for="(blog, index) in blogs" :key='index'>
        <div class="blog_desc">
          <router-link :to="'/singleBlog/'+blog.id">
            <span class="blog_title">{{blog.title}}</span>
            <span class='blog_content'>{{blog.content | toChunjing}}</span>
            <span class="blog_author">{{blog.author}}</span>
          </router-link>
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
            page: this.page
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
    }
  },
  mounted () {
    axios({
      method: 'get',
      url: '/api/get_blogs',
      params: {
        page: this.page
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
      return str.slice(0,33)+ '...'
    }
  }
}

</script>

<style scoped="scoped">
.test .zhanwei{
  height: 3em;
}
.test{
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
  top: 0;
  left: 0;
  z-index: -1;
}
.blog_desc{
  box-sizing: border-box;
  padding: 1em;
  width: 32em;
  /*height: 5em;*/
  margin: auto;
  margin-top: 2px;
  position: relative;
  background-color: white;
}
.blog_desc a{
  text-decoration: none;
  color: black;
}

.blog_author{
  display: block;
  font-size: 0.8em;
}
.blog_title{
  font-weight: bolder;
  position: relative;
}
.blog_content{
  position: relative;
  display: block;
  color: #AAA;
  font-size: 0.8em;
}

</style>
