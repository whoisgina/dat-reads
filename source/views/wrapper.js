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
      ${renderStyles(state, emit)}
      ${renderNavigation(state, emit)}
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
      ${renderStyles(state, emit)}
      ${renderNavigation(state, emit)}
      <div class="notfound">
        Page not found
      </div>
    </body>
  `
}

function renderStyles (state, emit) {
  var page = state.page('/').v()
  return html`
    <style>
      :root {
        --background: ${page.background};
        --foreground: ${page.foreground};
      }
    </style>
  `
}

function renderNavigation (state, emit) {
  var home = state.page('/').v()
  var pages = state.page('/')
    .pages()
    .toArray()
    .filter(page => page.visible !== false)

  return html`
    <nav class="container">
      <div>
        <h1><a href="${home.url}">${home.title}</a></h1>
      </div>
      <div>
        ${pages.map(renderLink)}
      </div>
    </nav>
  `

  function renderLink (props) {
    var activeClass = state.href && state.href.indexOf(props.url) >= 0 ? 'link-active' : ''
    return html`
      <span class="comma-item ${activeClass}"><a href="${props.url}">${props.title}</a></span>
    `
  }
}

function getTitle (state) {
  var siteTitle = state.page('/').v('title')
  var pageTitle = state.page().v('title')
  
  return siteTitle !== pageTitle
    ? siteTitle + ' | ' + pageTitle
    : siteTitle
}