<template>
  <div class="list">
    <list-header @handleSave="submit"></list-header>
    <list-form
      @newItem="getItem"
    ></list-form>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import ListHeader from './components/Header'
import ListForm from './components/Form'
export default {
  data () {
    return {
      newItem: {}
    }
  },
  computed: {
    ...mapState({
      todolist: state => state.todolist
    }),
    itemId () {
      return this.todolist.length
    }
  },
  methods: {
    // 映射 mutations 中的方法
    ...mapMutations([
      'saveData',
      'test'
    ]),
    // 接收 Form 子组件的传值
    getItem (parameter) {
      this.newItem = parameter
    },
    // 提交数据了,向首页路由传值
    submit () {
      let newItems = this.newItem
      // 判断是否存在数据
      if (newItems.title && newItems.timeStampStart && newItems.timeStampEnd) {
        this.saveData(newItems)
        this.$router.push({
          name: 'Home'
        })
      } else {
        alert('调皮，任务都没有写完整也要让人家提交🙄🙄')
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
