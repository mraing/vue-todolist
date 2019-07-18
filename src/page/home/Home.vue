<template>
  <div class="home">
    <home-header></home-header>
    <home-list :list="list"></home-list>
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
      list: [{
        id: 1,
        title: '今天也要好好学习呢',
        time: 'AM 7:30'
      }]
    }
  },
  components: {
    HomeHeader,
    HomeList,
    HomeAddItem
  },
  methods: {
    getData () {
      let title = this.$route.params.title
      if (title) {
        this.title = title
        this.list.push({
          id: this.list.length + 1,
          title: title,
          time: 'AM 7:30'
        })
      }
    }
  },
  mounted () {
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
