var html = require('choo/html')
var books = require('../components/books')

module.exports = view

function view (state, emit) {
  return html`
    <main>
      ${books(state, emit)}
    </main>
  `
}
