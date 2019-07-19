<template>
  <div class="list">
    <list-header @handleSave="submit"></list-header>
    <list-form @newTitle="getTitle"></list-form>
  </div>
</template>

<script>
import ListHeader from './components/Header'
import ListForm from './components/Form'
export default {
  data () {
    return {
      fatherTitle: '',
      newList: {}
    }
  },
  methods: {
    // 接收 form 子组件的值
    getTitle (title) {
      this.fatherTitle = title
      console.log(this.fatherTitle)
    },
    // 提交数据
    submit () {
      // 判断是否存在数据
      if (this.fatherTitle) {
        this.newList = {
          title: this.fatherTitle
        }
        console.log('save')
        console.log(this.newList)
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
