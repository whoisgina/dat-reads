var objectValues = require('object-values')
var html = require('choo/html')
var raw = require('choo/html/raw')
var xtend = require('xtend')

var timelineBook = require('./timeline-book')

// module.exports = timeline

function books (state, emit) {
  var page = state.content['/books'] || { }
  var books = objectValues(page.pages)
    .map(page => state.content[page.url])
    .map(page => xtend(page, { text: formatText(page.text) }))

  return html`
    <div class="timeline">
      <h1>reading timeline</h1>
    </div>
  `

  function renderTimeline (page) {
    return html`
    ${timelineBook(page, emit)}
    `
  }
}
