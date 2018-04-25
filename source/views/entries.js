var html = require('choo/html')
var renderEntry = require('../components/entry')

module.exports = view

function view (state, emit) {
  return html`
    <div>
      ${state.page().v('title')}
    </div>
  `
}
