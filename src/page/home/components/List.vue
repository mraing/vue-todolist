<template>
  <div class="list-box">
    <div class="list-number">总共有 {{handleIsShow}} 个任务</div>
    <div class="list-wrapper" ref="wrapper">
      <ul class="list" v-if="handleIsShow">
        <li class="list-item"
          v-for="(item, index) in handleList"
          :key="index"
          @click="handeleFinish(index)"
        >
          <div class="item-time">
            <span>{{item.timeStampStart.h}}:{{item.timeStampStart.m}}</span>
            <span class="item-date">{{item.timeStampStart.M}}-{{item.timeStampStart.D}}</span>
          </div>
          <div class="item-content">{{item.title}}</div>
        </li>
      </ul>
      <div v-else class="list-nothing">
        <i class="iconfont">&#xe613;</i>
        <p class="nothing-title">懒家伙，竟然一个任务都没有</p>
        <div>{{handleList}}</div>
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
    return {
      // newList: this.list,
      isShow: 0,
      dateList: []
    }
  },
  methods: {
    // 格式化时间
    handleDate (val) {
      val = Number(val)
      let date = new Date(val)
      let M, D, h, m
      let dateObj = {}
      // Y = date.getFullYear() + '-'
      M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      D = date.getDate()
      // h = date.getHours() + ':'
      h = date.getHours() <= 12 ? 'AM ' + date.getHours() : 'PM ' + date.getHours() % 12
      // 分钟若为整数，则再后面加一个 0，否则不加
      m = date.getMinutes() % 10 === 0 ? date.getMinutes() + '0' : date.getMinutes()
      // s = date.getSeconds()
      dateObj = {
        M: M,
        D: D,
        h: h,
        m: m
      }
      return dateObj
    },
    handeleFinish (index) {
      this.$emit('handeleFinish', index)
    }
  },
  computed: {
    handleList () {
      // 接收父组件的传值
      console.log('接收父组件的传值')
      console.log(this.list)
      // 复杂数据类型在栈中存贮的是指针,所以赋值给新的变量也会改变原始的变量值
      // 可以手动深度克隆一个复杂的数据出来
      // 先将对象转化为字符串,就是简单数据类型赋值,再用JSON.parse转化
      let handleList = JSON.parse(JSON.stringify(this.list))
      for (let i in handleList) {
        handleList[i].timeStampStart = this.handleDate(handleList[i].timeStampStart)
      }
      // 处理完成之后的数据
      console.log('处理完成之后的数据')
      console.log(handleList)
      return handleList
    },
    handleIsShow () {
      let handleIsShow = this.list.length
      return handleIsShow
    }
  },
  watch: {
    // 一旦列表数量变化了，便重置BScroll
    isShow () {
      this.$nextTick(() => {
        // 必须保证DOM加载完毕 再执行BScroll
        if (this.isShow) {
          this.scroll = new BScroll(this.$refs.wrapper)
        }
      })
    }
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
          display flex
          justify-content space-between
          font-size .4rem
          color #666
          .item-date
            padding-left .2rem
            color #999
            font-size .28rem
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
