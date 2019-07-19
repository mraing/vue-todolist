<template>
  <div class="home">
    <home-header></home-header>
    <home-list :list="todolist"></home-list>
    <home-add-item></home-add-item>
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
      title: '',
      todolist: []
    }
  },
  components: {
    HomeHeader,
    HomeList,
    HomeAddItem
  },
  watch: {
    todolist () {
      console.log('监听 list')
      console.log(this.todolist)
    }
  },
  methods: {
    // 读取路由传参，将参数放入 list 数组中
    getData () {
      let newList = this.$route.params.newList
      if (newList) {
        this.todolist.unshift({
          id: this.todolist.length,
          title: newList.title,
          time: 'AM 7:30'
        })
        this.saveData()
      }
    },
    // 将 list 数组保存至本地存储中
    saveData () {
      const parsed = JSON.stringify(this.todolist)
      localStorage.setItem('todolist', parsed)
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
