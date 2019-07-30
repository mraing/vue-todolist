<template>
  <div class="add-item">
    <router-link
      tag="button"
      class="add-button"
      to="/list"
    >
    <span class="iconfont">&#xe829;</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeAddlist',
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.add-item
  position fixed
  bottom .4rem
  right 50%
  left 50%
  margin 0 -.4rem 0 -.4rem
  z-index 2
  .add-button
    width 1rem
    height 1rem
    background $bgcolor
    color #fff
    border-radius 50%
    overflow hidden
    box-shadow 0 .2rem .5rem .02rem rgba(0,0,0,.1)
</style>
