<template>
  <div class="home">
    <home-header></home-header>
    <home-list
      :list="newList"
      @handeleFinish="handeleFinish"
    >
    </home-list>
    <home-add-item></home-add-item>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import HomeHeader from './components/Header'
import HomeList from './components/List'
import HomeAddItem from './components/AddItem'
export default {
  name: 'Home',
  data () {
    return {
      newItem: {}
    }
  },
  components: {
    HomeHeader,
    HomeList,
    HomeAddItem
  },
  computed: {
    ...mapState({
      todolist: state => state.todolist
    }),
    newList () {
      // 传值给子组件的数据
      console.log('传值给子组件的数据')
      console.log(this.todolist)
      return this.todolist
    }
  },
  methods: {
    ...mapMutations([
      'delData'
    ]),
    // 完成任务
    handeleFinish (index) {
      // 弹出框事件
      this.$vux.confirm.show({
        title: '你任务完成了么',
        content: '完成任务后不可撤回哦',
        hideOnBlur: true,
        onConfirm: () => {
          this.delData(index)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .home
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    background-color #fafafa
</style>
