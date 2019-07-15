<template>
    <div class="add-item">
      <button class="add-button"><span class="iconfont">&#xe829;</span></button>
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
    background #e06955
    color #fff
    border-radius 50%
    overflow hidden
    box-shadow 0 .2rem .5rem .02rem rgba(0,0,0,.1)
</style>
