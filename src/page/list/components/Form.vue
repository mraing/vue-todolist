<template>
  <div class="form">
    <div class="from-title-wrapper">
      <input class="from-title" type="text" placeholder="Heading" v-model="title" />
    </div>
    <div class="form-date">
      <div
        class="time"
        @click="start"
        v-text="startTime"
      >
      </div>
      <div class="time-icon iconfont">&#xe90e;</div>
      <div class="time"
        @click="end"
        v-text="endTime"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListForm',
  data () {
    return {
      title: '',
      startTime: 'Start',
      endTime: 'End',
      timeStampStart: '',
      timeStampEnd: '',
      timer: null
    }
  },
  components: {
  },
  methods: {
    start () {
      this.showPlugin('1')
    },
    end () {
      this.showPlugin('0')
    },
    // 引入 VUX 时间控件
    showPlugin (ele) {
      const _this = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'MM-DD HH:mm',
        minuteList: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
        value: '',
        // 点击确定按钮时触发
        onConfirm (val) {
          // 判断是起始时间还是结束时间
          if (ele === '1') {
            _this.startTime = val
          } else {
            _this.endTime = val
          }
        }
      })
    }
  },
  watch: {
    // 监听输入框
    title () {
      // 延迟触发获取输入框的值
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        let title = this.title
        // 向父组件传值
        this.$emit('newTitle', title)
      }, 300)
    },
    // 监听开始时间
    startTime () {
      if (this.timeStampStart !== 'Start') {
        // 转换为时间戳
        this.timeStampStart = Date.parse(this.startTime)
        // 向父组件传值
        this.$emit('timeStart', this.timeStampStart)
      }
    },
    // 监听结束时间
    endTime () {
      if (this.timeStampEnd !== 'End') {
        // 转换为时间戳
        this.timeStampEnd = Date.parse(this.endTime)
        // 向父组件传值
        this.$emit('timeEnd', this.timeStampEnd)
      }
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
      // touch-action none
      &:last-child
        text-align right
</style>
