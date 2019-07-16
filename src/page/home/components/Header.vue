<template>
    <h1 class="title">Todo List</h1>
</template>

<script>
export default {
  name: 'HomeHeader',
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.title
    padding .4rem .4rem .2rem .4rem
    font-size 0.56rem
    color $bgcolor
</style>
