<template>
  <div>
    <h1 class="title">TodoList</h1>
    <div class="list-number">
      总共有<span v-text="num"></span>个任务
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.title
  padding .4rem .4rem .2rem .4rem
  font-size 0.56rem
  color $bgcolor
.list-number
  padding .1rem .4rem
  font-size 0.28rem
  color #999
  line-height .4rem
</style>
