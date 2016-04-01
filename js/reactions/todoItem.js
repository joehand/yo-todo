module.exports = {
  destroyTodo: function (done, state, todo) {
    var todos = state.get().todos
    var index = todos.indexOf(todo)
    todos.splice(index, 1)
    done({todos: todos})
  },
  toggleTodo: function (done, state, todo) {
    var todos = state.get().todos
    var index = todos.indexOf(todo)
    todos[index].completed = !todos[index].completed
    done({todos: todos})
  },
  initEditTodo: function (done, state, todo) {
    var todos = state.get().todos
    var index = todos.indexOf(todo)
    todos[index].session.editing = true
    done({todos: todos})
  },
  editTodo: function (done, state, data) {
    var todos = state.get().todos
    var index = todos.indexOf(data.todo)
    todos[index].session.editText = data.value
    done({todos: todos})
  },
  submitTodo: function (done, state, data) {
    var todos = state.get().todos
    var index = todos.indexOf(data.todo)
    var val = data.value.trim()
    if (val) todos[index].title = val
    todos[index].session = undefined
    done({todos: todos})
  },
  cancelEdit: function (done, state, todo) {
    var todos = state.get().todos
    var index = todos.indexOf(todo)
    todos[index].session = undefined
    done({todos: todos})
  }
}
