<template>
  <div class="edit_container">
    <div class="blog-title"><input type="text" placeholder="请输入标题" v-model="title"/></div>
    <quill-editor
        class='editor'
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
        >
    </quill-editor>
    <p v-if="warning.length > 1" class="warning">{{warning}}</p>
    <button v-on:click="saveLocal">保存到草稿</button>
    <button v-on:click="sendToServer">发布博客</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'writeBlog',
  data () {
    return {
      content: localStorage.getItem('blog_draft') || '',
      title: localStorage.getItem('blog_title') || '',
      warning: '',
      editorOption: {
        theme: 'snow'
      }
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorReady (editor) { // 准备编辑器
    },
    onEditorBlur () {}, // 失去焦点事件
    onEditorFocus () {}, // 获得焦点事件
    onEditorChange () {}, // 内容改变事件
    saveLocal: function (event) {
      this.warning = '保存中...'
      localStorage.setItem('blog_draft', this.content)
      localStorage.setItem('blog_title', this.title)
      this.warning = '保存成功'
    },
    sendToServer: function () {
      // 首先根据img的src转化为file
      // 然后修改src为依次
      // 把file上传后
      this.warning = '正在上传...'

      var form = new FormData()
      var files = this.getFileOfImg()
      files.forEach((item, index) => {
        form.append(index + item.name, item)
      })
      form.append('content', this.content.replace(/<img src="data[^>]*>/g, '<img>'))
      form.append('title', this.title)
      form.append('token', localStorage.getItem('token') || '')
      axios({
        method: 'post',
        url: '/api/add_blog',
        data: form
      }).then((response) => {
        this.warning = response.data.msg
      }).catch(() => {
        this.warning = '发生异常'
      })
    },
    getFileOfImg () {
      var imgs = document.getElementsByTagName('img')
      var files = []
      for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].src.startsWith('data:image/')) {
          let file = this.dataURLtoFile(imgs[i].src, '')
          files.push(file)
        }
      }
      return files
    },
    dataURLtoFile (dataurl, filename = 'file') {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    }
  }

}
</script>

<style>
.edit_container{
  width: 1000px;
  margin: auto;
}

.edit_container .ql-container{
  height: 600px;
}
.blog-title input{
  box-sizing: border-box;
  width: 100%;
}

.warning{
    color: red;
    margin: 0;
  }
</style>
