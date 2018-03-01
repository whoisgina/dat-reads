var objectValues = require('object-values')
var objectKeys = require('object-keys')
var html = require('choo/html')

module.exports = view

function view (state, emit) {
  var page = state.content[state.href || '/']

  // loading
  if (!state.site.loaded) return renderLoading(state, emit)
  // 404
  if (!page) return renderNotFound(state, emit)

  // local data
  var pages = getPages(page, state.content)
  var fields = getFields(page)
  var files = objectValues(page.files)

  // template
  return html`
    <body>
      ${fields.map(renderField)}
      <section class="container">
        <h2>pages</h2>
        <ul>
          ${pages.map(renderPage)}
        </ul>
      </section>
      <section class="container">
        <h2>files</h2>
        <ul>
          ${files.map(renderFile)}
        </ul>
      </section>
    </body>
  `
}

function renderPage (state) {
  var title = state.title || state.name
  return html`<li><a href="${state.url}">${title}</a></li>`
}

function renderFile (state) {
  return html`
    <li>
      <a
        href="${state.path}"
        rel="noopener noreferrer"
        target="_blank"
      >${state.filename}</a>
    </li>
  `
}

function renderField (state) {
  return html`
    <section class="container">
      <h3>${state.key}</h3>
      <div>${state.value}</div>
    </section>
  `
}

function renderLoading (state, emit) {
  return html`
    <body>
      <div class="container">
        <h1>Loading</h1>
      </div>
    </body>
  `
}

function renderNotFound (state, emit) {
  return html`
    <body>
      <h1>Page not found</h1>
    </body>
  `
}

function getPages (page, content) {
  // missing props
  if (!page || !content) return [ ]
  // no sub-pages
  if (typeof page.pages !== 'object') return [ ]
  // grab our pages
  return objectValues(page.pages)
    .map(function (subpage) {
      return content[subpage.url]
    })
}

function getFields (state) {
  // don’t bother with these system fields
  var ignore = ['path', 'files', 'pages', 'name', 'url']

  // build up our fields array
  return objectKeys(state)
    .reduce(function (result, key) {
      // ignore if we should
      if (ignore.indexOf(key) >= 0) return result
      // create our key/value pair
      result.push({
        key: key,
        value: state[key]
      })
      // keep on keepin on
      return result
    }, [ ])
}
