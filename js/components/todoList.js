var yo = require('yo-yo')

var todoItem = require('./todoItem')

module.exports = function render (state) {
  var todos = state.get().todos
  var filter = state.get().filter
  if (filter !== 'all') {
    todos = todos.filter(function (todo) {
      return filter === 'completed' ? todo.completed : !todo.completed
    })
  }
  return yo`
    <ul class='todo-list'>
      ${todos.map(function (todo) {
        return yo`${todoItem(todo, state)}`
      })}
    </ul>`
}
