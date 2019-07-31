// 数据处理方法
export default {
  // 新增数据
  saveData (state, newList) {
    // 将新增数据放入列表中
    state.todolist.unshift(newList)
    // state.todolist.unshift(newList)
    // 在正式放入本地localStorage之前，将数组进行排序
    state.todolist = sortByKey(state.todolist, 'timeStampStart')
    // 存储数据
    localStorage.setItem('todolist', JSON.stringify(state.todolist))
    console.log('新增成功')
    console.log(state.todolist)
  },
  // 删除数据
  delData (state, n) {
    // 删除指定数据
    state.todolist.splice(n, 1)
    // 重新存储数据
    localStorage.setItem('todolist', JSON.stringify(state.todolist))
    console.log('删除成功')
  },
  // 测试
  test (state, n) {
    console.log(n)
    state.default.push(n)
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
