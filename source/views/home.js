var html = require('choo/html')
var books = require('../components/books')
var timeline = require('../components/timeline')

module.exports = view

function view (state, emit) {
  return html`
    <main>
      ${books(state, emit)}
    </main>
  `
}
      // ${timeline(state, emit)}
