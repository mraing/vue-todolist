<template>
  <div class="home">
    <home-header></home-header>
    <home-list :list="todolist"></home-list>
    <home-add-item :listIndex="itemId"></home-add-item>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeList from './components/List'
import HomeAddItem from './components/AddItem'
export default {
  name: 'Home',
  data () {
    return {
      newItem: {},
      todolist: [],
      itemId: ''
    }
  },
  components: {
    HomeHeader,
    HomeList,
    HomeAddItem
  },
  watch: {
    todolist () {
      this.itemId = this.todolist.length
    }
  },
  methods: {
    // 读取路由传参，将参数放入 list 数组中
    getData () {
      const newItem = this.$route.query.newItem
      // 判断是否存在数据
      if (newItem === undefined) {
        return
      }
      if (newItem.title) {
        this.newItem = newItem
        this.todolist.unshift(this.newItem)
        // 在正式放入本地localStorage之前，将数组进行排序
        this.todolist = sortByKey(this.todolist, 'timeStampStart')
        this.saveData()
      }
    },
    // 将 list 数组保存至本地存储中
    saveData () {
      const parsed = JSON.stringify(this.todolist)
      localStorage.setItem('todolist', parsed)
      this.newItem = ''
    }
  },
  mounted () {
    // 在页面即将被挂载的时候加载 JSON 数据，如果本地存储有数据的话，就先从本地存储里面拿，如果没有的话，清空本地存储
    if (localStorage.getItem('todolist')) {
      try {
        this.todolist = JSON.parse(localStorage.getItem('todolist'))
      } catch (e) {
        localStorage.removeItem('todolist')
      }
    }
    // 把本地储存的数据进行赋值，赋值完成后再执行这个新增方法
    this.getData()
  }
}
// 数组排序
function sortByKey (array, key) {
  return array.sort(function (a, b) {
    let x = a[key]
    let y = b[key]
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  })
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
