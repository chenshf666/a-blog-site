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
      return str.replace(/<[^>]+>/g, '').replace('<', '') + '...'
    }
  }
}

</script>

<style scoped="scoped">
.zhanwei{
  height: 100px;
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
  padding: 20px;
  width: 800px;
  height: 120px;
  border: 1px solid #AAA;
  margin: auto;
  position: relative;
}
.blog_desc a{
  text-decoration: none;
  color: black;
}

.blog_author{
  position: absolute;
  left: 20px;
  bottom: 20px;

  display: block;

}
.blog_title{
  font-weight: bolder;
  position: relative;
}
.blog_content{
  position: relative;
  display: block;

  color: #AAA;
}

</style>
