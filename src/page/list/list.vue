<template>
  <div class="list">
    <list-header @handleSave="submit"></list-header>
    <list-form
      @newItem="getItem"
      :itemId="itemId"
    ></list-form>
  </div>
</template>

<script>
import ListHeader from './components/Header'
import ListForm from './components/Form'
export default {
  data () {
    return {
      newItem: {},
      itemId: ''
    }
  },
  methods: {
    // 接收 Form 子组件的传值
    getItem (parameter) {
      this.newItem = parameter
    },
    // 提交数据了,向首页路由传值
    submit () {
      // 判断是否存在数据
      if (this.newItem.title && this.newItem.timeStampStart && this.newItem.timeStampEnd) {
        this.$router.push({
          name: 'Home',
          query: {
            newItem: this.newItem
          }
        })
      } else {
        alert('调皮，任务都没有写完整也要让人家提交🙄🙄')
      }
    },
    // 获取参数
    getData () {
      this.itemId = this.$route.query.itemId
    }
  },
  components: {
    ListHeader,
    ListForm
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>

</style>
