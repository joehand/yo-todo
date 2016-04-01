var yo = require('yo-yo')

module.exports = function render (state) {
  var todos = state.get().todos

  var activeTodoCount = todos.reduce(function (count, todo) {
    return todo.completed ? count : count + 1
  }, 0)
  var itemsLeftText = activeTodoCount === 1 ? 'item left' : 'items left'

  var filterClass = function (filter) {
    var filterActive = state.get().filter === filter
    return filterActive ? 'selected' : ''
  }

  return yo`
    <footer class='footer'>
      <span class='todo-count'>
        <strong>${activeTodoCount}</strong> ${itemsLeftText}
      </span>
      <ul class='filters'>
        <li>
          <a href='#/'
            class=${filterClass('all')}>All</a>
        </li>
        <li>
          <a href='#/active'
            class=${filterClass('active')}>Active</a>
        </li>
        <li>
          <a href='#/completed'
            class=${filterClass('completed')}>Completed</a>
        </li>
      </ul>
      ${clearButton()}
    </footer>`

  function clearButton () {
    if (todos.length - activeTodoCount) {
      return yo`
        <button
          class='clear-completed'
          onclick=${state.onEvent('clearCompleted')}>
          Clear completed
        </button>`
    }
  }
}
