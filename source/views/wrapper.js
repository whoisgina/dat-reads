var objectValues = require('object-values')
var objectKeys = require('object-keys')
var html = require('choo/html')

var views = require('./')

module.exports = view

function view (state, emit) {
  var page = state.page
  // loading
  if (!state.site.loaded) return renderLoading(state, emit)
  // 404
  if (!page().v('url')) return renderNotFound(state, emit)
  // view
  var view = views[page().v('view')] || views.default

  // title
  var title = getTitle(state)
  if (state.title !== title) emit(state.events.DOMTITLECHANGE, title)

  // template
  return html`
    <body>
      ${view(state, emit)}
    </body>
  `
}

function renderLoading (state, emit) {
  return html`
    <body>
      <div class="loading"></div>
    </body>
  `
}

function renderNotFound (state, emit) {
  return html`
    <body>
      <div class="notfound">
        Page not found
      </div>
    </body>
  `
}

function getTitle (state) {
  var siteTitle = state.page('/').v('title')
  var pageTitle = state.page().v('title')

  return siteTitle !== pageTitle
    ? siteTitle + ' | ' + pageTitle
    : siteTitle
}
