var yo = require('yo-yo')

var ENTER_KEY = 13

module.exports = function render (state) {
  return yo`
    <header class='header'>
      <h1>todos</h1>
      <input
        class='new-todo'
        placeholder='What needs to be done?'
        onkeydown=${function (e) {
          if (e.keyCode === ENTER_KEY) {
            e.preventDefault()
            var val = e.target.value.trim()
            if (val) {
              state.trigger('addTodo', val)
            }
          }
        }}
        autofocus
      />
    </header>`
}
