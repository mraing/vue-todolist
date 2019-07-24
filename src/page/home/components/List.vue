<template>
  <div class="list-box">
    <div class="list-number">今天有 {{list.length}} 个任务</div>
    <div class="list-wrapper" ref="wrapper">
      <ul class="list" v-if="list.length">
        <li class="list-item" v-for="(item, index) in list" :key="index">
          <div class="item-time">{{item.startTime}}</div>
          <div class="item-content">{{item.title}}</div>
        </li>
      </ul>
      <div v-else class="list-nothing">
        <i class="iconfont">&#xe613;</i>
        <p class="nothing-title">懒家伙，竟然一个任务都没有</p>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'HomeList',
  props: {
    list: {
      type: Array
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper)
  }
}
</script>

<style lang="stylus" scoped>
.list-box
  position absolute
  top 1.16rem
  left 0
  right 0
  bottom 0
  overflow hidden
  .list-number
    padding .1rem .4rem
    font-size 0.28rem
    color #999
    line-height .4rem
  .list-wrapper
    position absolute
    top .6rem
    left 0
    right 0
    bottom 0
    overflow hidden
    .list
      padding-bottom 1.5rem
      .list-item
        margin .2rem
        padding .2rem
        border-radius .1rem
        background #fff
        border 1px solid rgba(0,0,0,.08)
        overflow hidden
        .item-time
          padding-top .1rem
          font-size .4rem
          color #666
        .item-content
          padding .2rem 0 .1rem 0
          font-size .28rem
          line-height .5rem
    .list-nothing
      margin-top 1.5rem
      text-align center
      .iconfont
        font-size 1.6rem
        color #999
      .nothing-title
        line-height .6rem
        font-size .28rem
        color #999
</style>
