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
    <p v-if="warning.length > 1">{{warning}}</p>
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
      this.warning = '正在上传...'
      axios({
        method: 'post',
        url: '/api/add_blog',
        data: {
          content: this.content,
          title: this.title,
          token: localStorage.getItem('token') || ''

        }
      }).then((response) => {
        this.warning = response.data.msg
      }).catch(() => {
        this.warning = '发生异常'
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
.ql-container{
  height: 600px;
}

.blog-title input{
  box-sizing: border-box;
  font-size: 30px;
  width: 100%;
}

p{
    color: red;
    margin: 0;
  }
</style>
