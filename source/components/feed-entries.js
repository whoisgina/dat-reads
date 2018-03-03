var objectValues = require('object-values')
var html = require('choo/html')
var raw = require('choo/html/raw')
var xtend = require('xtend')

var entry = require('./entry')

module.exports = feedEntries

function feedEntries (state, emit) {
  var page = state.content['/entries'] || { }
  var entries = objectValues(page.pages)
    .map(page => state.content[page.url])
    .map(page => xtend(page, { text: formatText(page.text) }))
    .map(renderEntry)

  return html`
    <ul class="entries">
      ${entries}
    </ul>
  ` 

  function renderEntry (page) {
    return html`
      <li>
        <a href="${page.url}">
          ${entry(page, emit)}
        </a>
      </li>
    `
  }
}

function formatText (str) {
  return (str || '')
    .split('\n')
    .splice(0, 3)
    .join('\n')
    .trim()
}
