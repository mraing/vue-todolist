<template>
  <div class="home">
    <home-header></home-header>
    <home-list></home-list>
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
    return {}
  },
  components: {
    HomeHeader,
    HomeList,
    HomeAddItem
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
