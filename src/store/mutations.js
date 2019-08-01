// 数据处理方法
export default {
  // 新增任务
  saveData (state, newList) {
    // 将新增数据放入列表中
    state.todolist.unshift(newList)
    // 在正式放入本地localStorage之前，将数组进行排序
    state.todolist = sortByKey(state.todolist, 'timeStampStart')
    // 存储数据
    localStorage.setItem('todolist', JSON.stringify(state.todolist))
    console.log('新增成功')
  },
  // 删除任务
  delData (state, n) {
    // 删除指定数据
    state.todolist.splice(n, 1)
    // 重新存储数据
    localStorage.setItem('todolist', JSON.stringify(state.todolist))
    console.log('删除成功')
  },
  // 是否完成任务
  finishData (state, n) {
    state.todolist[n].isFinish = !state.todolist[n].isFinish
    localStorage.setItem('todolist', JSON.stringify(state.todolist))
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
