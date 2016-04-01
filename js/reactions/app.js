var extend = require('xtend')

var todoReactions = require('./todoItem')

var appReactions = {
  addTodo: function (done, state, val) {
    var todos = state.get().todos
    var todo = {
      title: val,
      completed: false,
      id: todos.length
    }
    todos.push(todo)
    done({todos: todos})
  },
  toggleAll: function (done, state) {
    var checked = !state.get().toggleAllChecked
    var todos = state.get().todos.map(function (todo) {
      return extend(todo, {completed: checked})
    })
    done({todos: todos, toggleAllChecked: checked})
  },
  filter: function (done, state, name) {
    done({filter: name})
  },
  clearCompleted: function (done, state) {
    var todos = state.get().todos.filter(function (todo) {
      return !todo.completed
    })
    done({todos: todos, toggleAllChecked: false})
  }
}

module.exports = extend(appReactions, todoReactions)
