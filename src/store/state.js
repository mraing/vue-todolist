// 数据状态
let defaultList = []

try {
  if (localStorage.getItem('todolist')) {
    defaultList = JSON.parse(localStorage.getItem('todolist'))
  }
} catch (error) {}

export default {
  todolist: defaultList
}
