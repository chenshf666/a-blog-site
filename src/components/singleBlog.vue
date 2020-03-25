<template>
   <div class="singleBlog_blog_container" @scroll="lazyload">
    <div class="singleBlog_whole_blog">
      <div class="singleBlog_zhanwei"></div>
      <div class="singleBlog_blog_title">{{title}}</div>
      <div class="singleBlog_blog_author"><router-link :to='"/userBlogs/"+author'>{{author}}</router-link></div>
      <div class="singleBlog_blog_time">最后发布于{{time}}</div>
      <div ref='blog_body' class="ql-snow ql-editor ql-container"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'singleBlog',
  data () {
    return {
      content: this.$route.params.id,
      title: '',
      time: '',
      author: '',
      urls: '',
      isLogin: sessionStorage.getItem('isLogin'),
      canDelete: false,
      imgs: [],
      editorOption: {
        theme: 'snow'
      }
    }
  },
  mounted () {
    axios({
      url: '/api/get_single_blog',
      method: 'get',
      params: {
        id: this.$route.params.id
      }
    }).then((response) => {
      this.$refs.blog_body.innerHTML = response.data.content
      this.title = response.data.title
      this.author = response.data.author
      this.time = response.data.create_time
      this.urls = JSON.parse(response.data.img_urls)

      if(this.author === this.isLogin){
        this.canDelete = true
      }
      // 获取所有图像，没有指定src说明是上传的图片
      let allImgs = document.getElementsByTagName('img')
      for (let i of allImgs) {
        if (!i.src) {
          i.width = i.height = '501' // 赋予假的宽高，适当占位
          this.imgs.push(i)
        }
      }
      this.check()
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    lazyload () {
      var timer = null
      if (timer == null) {
        timer = setTimeout(() => {
          this.check()
          timer = null
        }, 1000)
      }
    },
    check () {
      for (var index = this.imgs.length - 1; index > -1; index--) {
        let item = this.imgs[index]
        if (!item.src && this.isInScreen(index, item)) {
          item.src = this.urls[index]
          // onload之后去除假的宽高，还原图像自身大小
          item.onload = () => {
            item.removeAttribute('width')
            item.removeAttribute('height')
          }
          this.imgs.splice(index, 1) // 及时从数组从去除，防止无意义计算
          this.urls.splice(index, 1)
        }
      }
    },
    isInScreen (index, img) {
      if (img.getBoundingClientRect().top <= document.documentElement.clientHeight) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
  .singleBlog_blog_container{
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    left: 0;
    top: 0;
    overflow: auto;
    z-index: -1;
    
  }
  .singleBlog_whole_blog{
    width: 42em;
    padding: 1em;
    margin: auto;
    background-color: white;
  }
  .singleBlog_whole_blog .singleBlog_zhanwei{
    height: 3em;
  }
  
  .singleBlog_blog_title{
    font-weight: bolder;
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }
  .singleBlog_blog_author,.singleBlog_blog_time{
    font-size: 0.8em;
    display: inline-block;
    margin-right: 0.8em;
  }
  .singleBlog_blog_time{
    color:#AAA;
  }
  .singleBlog_blog_author a{
    color: blue;
    text-decoration: none;
  }
</style>

<style>

  @media only screen and (min-width: 1200px){
    img{
      max-width: 900px;
    }
  }
  @media only screen and (max-width: 1200px) and (min-width: 600px){
    img{
      max-width: 90%;
    }
    .singleBlog_blog_container{
      width: 100%;
      height: 100%;
    }
    .singleBlog_whole_blog{
      width: 100%;
      padding: 1em;
      box-sizing: border-box;
    }
  }
  @media only screen and (max-width: 600px){
    img{
      max-width: 90%;
    }
    .singleBlog_blog_container{
      width: 100%;
      height: 100%;
    }
    .singleBlog_whole_blog{
      width: 100%;
      padding: 1em;
      box-sizing: border-box;
    }
  }
</style>
