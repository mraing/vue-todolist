<template>
  <div class="home">
    <home-header :num="newList.length"></home-header>
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
      newList: []
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
    })
  },
  watch: {
    todolist: {
      // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
      handler (val, oldVal) {
        this.getData()
      },
      deep: true
    }
  },
  methods: {
    // 映射删除方法和完成方法
    ...mapMutations([
      'delData', 'finishData'
    ]),
    // 处理时间
    handeleFinish (type, sub) {
      // 完成任务
      if (type === 'finish' || type === 'withdraw') {
        this.$vux.confirm.show({
          title: '提示',
          content: type === 'finish' ? '任务真的完成了嘛(ㅅ˘ㅂ˘)' : '不许随便点完成啊눈_눈',
          hideOnBlur: true,
          onConfirm: () => {
            this.finishData(sub)
          }
        })
      } else {
        this.$vux.confirm.show({
          title: '警告',
          content: '删除任务后不能撤回哦(ㅅ˘ㅂ˘)',
          hideOnBlur: true,
          onConfirm: () => {
            this.delData(sub)
          }
        })
      }
    },
    // 获取本地数据
    getData () {
      // 复杂数据类型在栈中存贮的是指针,所以赋值给新的变量也会改变原始的变量值
      // 可以手动深度克隆一个复杂的数据出来
      // 先将对象转化为字符串,就是简单数据类型赋值,再用JSON.parse转化
      this.newList = JSON.parse(JSON.stringify(this.todolist))
    }
  },
  created () {
    this.getData()
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
