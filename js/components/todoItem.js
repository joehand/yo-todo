var yo = require('yo-yo')

var ENTER_KEY = 13
var ESC_KEY = 27

module.exports = function render (todo, state) {
  var editText = ''
  var className = todo.completed ? 'completed ' : ''
  if (todo.session) {
    editText = todo.session.editText ? todo.session.editText : todo.title
    className += todo.session.editing ? 'editing ' : ''
  } else {
    Object.defineProperty(todo, 'session', {value: {}, writable: true})
  }
  return yo`
    <li class=${className}>
      <div class='view'>
        <input class='toggle' type='checkbox'
          checked=${todo.completed}
          onchange=${state.onEvent('toggleTodo', todo)} />
        <label ondblclick=${state.onEvent('initEditTodo', todo)}>${todo.title}</label>
        <button class='destroy' onclick=${state.onEvent('destroyTodo', todo)}></button>
      </div>
      <input
        className='edit'
        value=${editText}
        onblur=${function (e) {
          state.trigger('submitTodo', {value: e.target.value, todo: todo})
        }}
        onchange=${function (e) {
          state.trigger('editTodo', {value: e.target.value, todo: todo})
        }}
        onkeydown=${function (e) {
          if (e.keyCode === ENTER_KEY) {
            state.trigger('submitTodo', {value: e.target.value, todo: todo})
          } else if (e.keyCode === ESC_KEY) {
            state.trigger('cancelEdit', todo)
          }
        }}
      />
    </li>`
}
