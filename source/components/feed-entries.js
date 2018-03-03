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

  if (typeof page.sort === 'string') {
    entries = getPagesSort(entries, page.sort) 
  }

  return html`
    <ul class="entries">
      ${entries.map(renderEntry)}
    </ul>
  ` 

  function renderEntry (page) {
    return html`
      <li>
        <a href="${page.url}">${entry(page, emit)}</a>
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

function getPagesSort (pages, sort) {
  switch (sort) {
    case 'alphabetical':
      return pages.sort(function (a, b) { 
        return (a.title || a.name).localeCompare(b.title || b.name)
      })
    case 'reverse-alphabetical':
      return pages.sort(function (a, b) { 
        return (b.title || b.name).localeCompare(a.title || a.name)
      })
    case 'reverse-chronological':
      return pages.sort(function (a, b) { 
        if (a.date && b.date) return new Date(b.date) - new Date(a.date)
      })
    case 'chronological':
      return pages.sort(function (a, b) { 
        if (a.date && b.date) return new Date(a.date) - new Date(b.date)
      })
  }
}
