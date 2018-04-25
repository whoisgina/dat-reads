var html = require('choo/html')
var content = require('../components/content')

module.exports = view

function view (state, emit) {
  return html`
    <div class="content copy copy-width">
      ${content(state.page().v('text'))}
    </div>
  `
}
