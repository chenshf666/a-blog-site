<template>
  <div class="edit_container" v-loading="loading"
    element-loading-text="拼命上传中">
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
    <button type='primary' v-on:click="sendToServer">发布博客</button>
    <button type='primary' v-on:click="saveLocal">保存到草稿</button>

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
      loading: false,
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
      this.loading = true // 设置为true，发动v-loading
      if (this.title === '' || this.content === '') {
        this.$message({
          showClose: true,
          message: '请填写标题和内容！！！！',
          type: 'warning'
        })
        this.loading = false
        return
      }
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
        switch (response.data.status) {
          case 0:
            this.$message({type: 'success', showClose: true, message: '上传成功'})
            break
          case 1:
            this.$parent.setLogin('')
            this.$message({type: 'error', showClose: true, message: '身份验证失败，请重新登录'})
            break
          case 2:
            this.$message({type: 'error', showClose: true, message: '发生异常，请重试'})
            break
        }
      }).catch(() => {
        this.$message({type: 'error', showClose: true, message: '发生异常，请重试'})
      })
      this.loading = false
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

<style scoped>
.edit_container{
  width: 42em;
  padding: 1em;
  margin: auto;
  background: white;
  position: relative;
  top: 0.5em;
  overflow: hidden;
}
.edit_container button{
  font-size: 0.8em;
  background-color: white;
  border: 1px solid blue;
  color: blue;
  padding: 0.4em;
  border-radius: 0.2em;
  margin-top: 1em;
  margin-right: 0.5em;
  float: right;
}
.edit_container .ql-container{
  height: 28em;
}
.blog-title input{
  box-sizing: border-box;
  width: 100%;
  font-size: 0.8em;
  margin-bottom: 1em;
  padding: 0.5em;
  border-radius: 0.2em;
}

.warning{
    color: red;
    margin: 0;
}

</style>
