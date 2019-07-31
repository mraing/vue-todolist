<template>
  <div class="form">
    <div class="from-title-wrapper">
      <input class="from-title"
        type="text"
        placeholder="Heading"
        v-model="title"
        ref="inputFocus"
      />
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
import {mapState} from 'vuex'
export default {
  name: 'ListForm',
  data () {
    return {
      // 记录任务标题
      title: '',
      // 记录开始时间
      startTime: 'Start',
      // 记录结束时间
      endTime: 'End',
      // 开始时间转换为时间戳
      timeStampStart: '',
      // 结束时间转换为时间戳
      timeStampEnd: ''
    }
  },
  computed: {
    ...mapState({
      todolist: state => state.todolist
    }),
    myItemId () {
      let myItemId = this.todolist.length + 1
      return myItemId
    }
  },
  methods: {
    start () {
      const _this = this
      // 接收参数
      this.showPlugin(function (val) {
        _this.startTime = val
        // 转换为时间戳
        _this.timeStampStart = Date.parse(_this.startTime)
        _this.judgeDate()
      })
    },
    end () {
      const _this = this
      // 接收参数
      this.showPlugin(function (val) {
        _this.endTime = val
        // 转换为时间戳
        _this.timeStampEnd = Date.parse(_this.endTime)
        _this.judgeDate()
      })
    },
    // 引入 VUX 时间控件
    showPlugin (callBack) {
      // const _this = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD HH:mm',
        yearRow: '{value}年',
        monthRow: '{value}月',
        dayRow: '{value}日',
        hourRow: '{value}点',
        minuteRow: '{value}分',
        minYear: 2019,
        maxYear: 2019,
        minuteList: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
        value: '',
        // 点击确定按钮时触发
        onConfirm (val) {
          callBack(val)
        }
      })
    },
    // 判断时间是否选择正确
    judgeDate () {
      const _this = this
      // 判断是否选择了时间，若没有选择时间，直接结束 不再执行接下来的代码
      if (this.startTime === 'Start' || this.endTime === 'End') {
        return
      }
      // 判断结束时间是否大于开始时间
      if (Number(this.timeStampEnd) <= Number(this.timeStampStart)) {
        this.$vux.alert.show({
          title: '🙀🙀',
          hideOnBlur: true,
          buttonText: '我错了',
          content: '大佬你是穿越过来的么?任务竟然提前完成了',
          onShow () {
            // 当模态框显示时
          },
          onHide () {
            // 当模态框关闭时
            _this.endTime = 'End'
            _this.timeStampEnd = ''
          }
        })
      } else {
        // 向父组件传值
        let parameters = {
          id: this.myItemId,
          title: this.title,
          timeStampStart: this.timeStampStart,
          timeStampEnd: this.timeStampEnd,
          isFinish: false
        }
        console.log(parameters)
        this.$emit('newItem', parameters)
      }
    }
  },
  watch: {
    title () {
      this.judgeDate()
    }
  },
  mounted () {
    // 一进页面便聚焦输入框
    this.$refs['inputFocus'].focus()
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
