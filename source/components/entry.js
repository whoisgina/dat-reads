var dateFormat = require('dateformat')
var html = require('choo/html')
var content = require('./content')

module.exports = entry

function entry (state, emit) {
  var date = dateFormat(new Date(state.date), 'mmmm dS, yyyy')
  return html`
    <div class="container">
      <ul>
        <li><b>${state.title}</b></li>
        <li>${date}</li>
      </ul>
      <div class="copy copy-width">
        ${content(state.text)}
      </div>
    </div>
  `
}
