<template>
   <div class="blog_container" @scroll="lazyload">
    <div class="whole_blog">
      <div class="zhanwei"></div>
      <div class="blog_title">{{title}}</div>
      <div class="blog_desc">{{author}}{{time}}</div>
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
          item.src = 'http://localhost:8000' + this.urls[index]
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
  .blog_container{
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    left: 0;
    top: 0;
    overflow: auto;
    z-index: -1;
  }
  .whole_blog{
    width: 1000px;
    margin: auto;
  }
  .zhanwei{
    height: 100px;
  }
  img{
    max-width: 900px;
  }
</style>
