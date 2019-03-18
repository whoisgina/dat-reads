var objectValues = require('object-values')
var html = require('choo/html')
var raw = require('choo/html/raw')
var xtend = require('xtend')

var book = require('./book')
var timelineBook = require('./timeline-book')

module.exports = books

function books (state, emit) {
  var page = state.content['/books'] || { }
  var books = objectValues(page.pages)
    .map(page => state.content[page.url])
    .map(page => xtend(page, { text: formatText(page.text) }))

  var sortedBooks = getPagesSort(books, 'chronological')

  return html`
    <ul class="books">
      ${sortedBooks.map(renderBook)}
    </ul>

    <div class="timeline">
      <h1>2018 reading timeline</h1>
      <div class="january month">J</div>
      <div class="february month">F</div>
      <div class="march month">M</div>
      <div class="april month">A</div>
      <div class="may month">M</div>
      <div class="june month">J</div>
      <div class="july month">J</div>
      <div class="august month">A</div>
      <div class="september month">S</div>
      <div class="october month">O</div>
      <div class="november month">N</div>
      <div class="december month">D</div>
      ${sortedBooks.map(renderTimelineItem)}
    </div>
  `

  function renderBook (page) {
    return html`
      <li>
        ${book(page, emit)}
      </li>
    `
  }

  function renderTimelineItem (page, index) {
    return html`
    ${timelineBook(page, emit, index)}
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

// can we let people sort books on the page this way? using like...state.sort??? which are set on click?

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
        if (a.dateStarted && b.dateStarted) return new Date(a.dateStarted) - new Date(b.dateStarted)
      })
  }
}
