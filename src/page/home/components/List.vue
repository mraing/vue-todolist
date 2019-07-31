<template>
  <div class="list-box">
    <div class="list-wrapper" ref="wrapper">

      <swipeout class="list">
          <swipeout-item
            class="list-item"
            v-for="(item, index) in dateList"
            :key="index"
            transition-mode="follow"
            v-bind:class="{'list-item-finish': item.isFinish}"
          >
            <div slot="right-menu">
              <swipeout-button
                v-if="item.isFinish"
                @click.native="onButtonClick('withdraw', index)"
                background-color="#e06955"
              >
                取消完成
              </swipeout-button>
              <swipeout-button
                v-else
                @click.native="onButtonClick('finish',index)"
                background-color="#e06955"
              >
                完成任务
              </swipeout-button>
              <swipeout-button
                @click.native="onButtonClick('del',index)"
                background-color="#e08e54"
              >
                删除任务
              </swipeout-button>
            </div>
            <div slot="content">
              <div
                class="item-time"
                :class="{'item-content-active': item.isFinish}"
              >
                <span>{{item.timeStampStart.h}}:{{item.timeStampStart.m}}</span>
                <span class="item-date">{{item.timeStampStart.M}}-{{item.timeStampStart.D}}</span>
              </div>
              <div
                class="item-content"
                :class="{'item-content-active': item.isFinish}"
              >
                {{item.title}}
              </div>
            </div>
          </swipeout-item>
        </swipeout>

      <ul class="list" v-if="handleIsShow" style="display:none">
        <li class="list-item "
          v-for="(item, index) in dateList"
          :key="index"
          @click="handeleFinish(index)"
          v-bind:class="{'list-item-finish': item.isFinish}"
        >
          <div
            class="item-time item-content-active"
          >
            <span>{{item.timeStampStart.h}}:{{item.timeStampStart.m}}</span>
            <span class="item-date">{{item.timeStampStart.M}}-{{item.timeStampStart.D}}</span>
          </div>
          <div
            class="item-content"
            :class="{'item-content-active': item.isFinish}"
          >
            {{item.title}}
          </div>
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
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
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
      handleIsShow: 0,
      isShow: this.list,
      dateList: []
    }
  },
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  methods: {
    // 滑动事件
    onButtonClick (type, sub) {
      this.$emit('handeleFinish', type, sub)
    },
    handle () {
      this.dateList = this.list
      for (let i in this.dateList) {
        this.dateList[i].timeStampStart = this.handleDate(this.dateList[i].timeStampStart)
      }
      this.handleIsShow = this.dateList.length
    },
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
      m = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()
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
  watch: {
    // 一旦列表数量变化了，便重置BScroll
    handleIsShow () {
      this.$nextTick(() => {
        // 必须保证DOM加载完毕 再执行BScroll
        this.scroll = new BScroll(this.$refs.wrapper)
      })
    },
    list () {
      // 监听 list 的变化
      this.handle()
    }
  },
  created () {
    this.handle()
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
      .list-item-finish
        background #F5F5F5
        box-shadow 0 0 10px 1px inset rgba(0,0,0,0.03)
        .item-content-active
          color #999
          font-style italic
          text-decoration line-through
    .list >>> .vux-swipeout-content
      background transparent
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
