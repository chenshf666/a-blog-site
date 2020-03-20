<template>
  <div>{{content}}</div>
</template>

<script>
export default {
  name: 'singleBlog',
  data () {
    return {
      content: this.$route.params.content
    }
  },
  mounted(){
    console.log(this.$route.params)
  }
}
</script>

<style>
</style>
