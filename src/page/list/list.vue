<template>
  <div class="list">
    <list-header @handleSave="submit"></list-header>
    <list-form
      @newTitle="getTitle"
      @timeStart="gitTimeStart"
      @timeEnd="gitTimeEnd"
    ></list-form>
  </div>
</template>

<script>
import ListHeader from './components/Header'
import ListForm from './components/Form'
export default {
  data () {
    return {
      fatherTitle: '',
      fatherStartTime: '',
      fatherEndTime: '',
      newList: {}
    }
  },
  methods: {
    // 接收 form 子组件的标题
    getTitle (title) {
      this.fatherTitle = title
      console.log(this.fatherTitle)
    },
    // 接收子组件的起始时间
    gitTimeStart (timeStart) {
      console.log('接收子组件的起始时间')
      this.fatherStartTime = timeStart
      console.log(this.fatherStartTime)
    },
    // 接收子组件的结束时间
    gitTimeEnd (timeEnd) {
      console.log('接收子组件的结束时间')
      this.fatherEndTime = timeEnd
      console.log(this.fatherEndTime)
    },
    // 提交数据了,向首页路由传值
    submit () {
      // 判断是否存在数据
      if (this.fatherTitle) {
        this.newList = {
          title: this.fatherTitle,
          startTime: this.fatherStartTime,
          endTime: this.fatherEndTime
        }
        console.log('save')
        // console.log(this.newList)
        this.$router.push({
          name: 'Home',
          params: {
            newList: this.newList
          }
        })
      } else {
        alert('调皮，明明什么任务都没有写也要让人家提交')
      }
    }
  },
  components: {
    ListHeader,
    ListForm
  }
}
</script>

<style lang="stylus" scoped>

</style>
