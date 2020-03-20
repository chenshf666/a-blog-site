<template>
  <div>
    <div v-for="(blog, index) in blogs" :key='index'>
      <router-link :to="'/singleBlog/'+blog.fields.author">
        <div class="blog_desc">
          <span>{{blog.fields.title}}</span>
          <span class="blog-title">{{blog.fields.author}}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'showBlogs',
  data () {
    return {
      blogs: []
    }
  },
  mounted(){
    axios({
      method: 'get',
      url: '/api/get_blogs',
      params:{
        
      }
    }).then((response)=>{
      this.blogs = response.data
    }).catch((err)=>{
      console.log(err)
    })
  }
}

</script>

<style scoped="scoped">
.blog_desc{
  box-sizing: border-box;
  padding: 20px;
  width: 800px;
  height: 100px;
  border: 1px solid #AAA;
  margin: auto;
  position: relative;
}

.blog-title{
  position: absolute;
  left: 20px;
  bottom: 20px;
  font-size: 15px;
}
</style>
