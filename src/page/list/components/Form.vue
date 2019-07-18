<template>
  <div class="form">
    <div class="from-title-wrapper">
      <input class="from-title" type="text" placeholder="Heading" v-model="title" />
    </div>
    <div class="form-date">
      <div class="time">start</div>
      <div class="time-icon iconfont">&#xe90e;</div>
      <div class="time">end</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListForm',
  data () {
    return {
      title: '',
      timer: null
    }
  },
  components: {},
  methods: {},
  watch: {
    title () {
      // 延迟触发获取输入框的值
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        let title = this.title
        this.$emit('newTitle', title)
      }, 500)
    }
  }
}
</script>

<style lang="stylus" scoped>
.form
  .from-title-wrapper
    .from-title
      box-sizing border-box
      display block
      padding .2rem
      width 100%
      color #222
      line-height .8rem
      font-size .4rem
      border-radius .1rem
  .form-date
    display flex
    justify-content space-between
    line-height .8rem
    color #78798a
    font-size .32rem
    .time
      padding 0 .2rem
      flex 1
      font-size .4rem
      &:last-child
        text-align right
</style>
