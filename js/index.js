var yo = require('yo-yo')
var extend = require('xtend')
var State = require('state-reactor')
var director = require('director')

var reactions = require('./reactions/app')
var header = require('./components/header')
var footer = require('./components/footer')
var list = require('./components/todoList')

var STORAGE_KEY = 'todos-yo'

var defaultState = {
  filter: 'all',
  toggleAllChecked: false,
  todos: []
}

var initState = extend(defaultState, readLocalStorage())
var appState = State(initState, reactions)
var appContainer = renderApp(appState)
var router = director.Router({
  '/' : appState.onEvent('filter', 'all'),
  '/active': appState.onEvent('filter', 'active'),
  '/completed': appState.onEvent('filter', 'completed')
})

router.init(getFilterRoute(appState))
document.body.insertBefore(appContainer, document.body.firstChild)

appState.on('update', function (oldState) {
  if (oldState.filter !== appState.get().filter) {
    router.setRoute(getFilterRoute(appState))
  }
  writeLocalStorage(appState)
  yo.update(appContainer, renderApp(appState))
})

function renderApp (state) {
  return yo`
    <section class='todoapp'>
      ${header(state)}
      ${renderMain(state)}
      ${renderFoot(state)}
    </section>`
}

function renderMain (state) {
  if (!state.get().todos.length) return
  var checked = state.get().toggleAllChecked ? 'checked' : ''
  return yo`
    <section class='main'>
      <input
        class='toggle-all' type='checkbox'
        onchange=${state.onEvent('toggleAll')}
        ${checked}
      />
      ${list(state)}
    </section>`
}

function renderFoot(state) {
  if (!state.get().todos.length) return
  return yo`${footer(state)}`
}

function getFilterRoute (state) {
  var filter = state.get().filter
  if (filter === 'all') return '/'
  return '/' + filter
}

function writeLocalStorage (state) {
  localStorage[STORAGE_KEY] = JSON.stringify(state.get())
}

function readLocalStorage () {
  var data = localStorage[STORAGE_KEY]
  if (!data) return {}
  return JSON.parse(data)
}
