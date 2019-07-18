<template>
  <div class="header">
      <router-link
        to="/"
        class="header-icon"
      >
        <span class="iconfont">&#xe601;</span>
      </router-link>
      <div class="header-save" @click="handleSave">Save</div>
  </div>
</template>

<script>
export default {
  name: 'ListHeader',
  data () {
    return {}
  },
  methods: {
    handleSave () {
      this.$emit('handleSave')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.header
  display flex
  justify-content space-between
  line-height $headerHeight
  background #fafafa
  .header-icon
    padding 0 .2rem
    color #222222
    font-size .5rem
    font-weight 700
  .header-save
    padding 0 .2rem
    color $bgcolor
    font-size .4rem
    font-weight 700
</style>
