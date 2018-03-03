var html = require('choo/html')
var feedEntries = require('../components/feed-entries')

module.exports = view

function view (state, emit) {
  return html`
    <div>
      ${feedEntries(state, emit)}
    </div>
  `
}
