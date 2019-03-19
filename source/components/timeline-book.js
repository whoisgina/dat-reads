var dateFormat = require('dateformat')
var ov = require('object-values')
var html = require('choo/html')
var timeline = require('../components/timeline')

module.exports = timelineBook

function dayOfYear (date) {
  const completeDate = new Date(date)
  var start = new Date(completeDate.getFullYear(), 0, 0);
  var diff = (completeDate - start) + ((start.getTimezoneOffset() - completeDate.getTimezoneOffset()) * 60 * 1000);
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.ceil(diff / oneDay);

  return html`
    ${day}
  `
}

function timelineBook (state, emit, index) {
  return html`
    <div class="timeline__book"
         style="grid-column: ${dayOfYear(state.dateStarted)} / ${dayOfYear(state.dateCompleted)}; grid-row: ${index + 15}">
         <div class="timeline__book__detail">
          <div class="timeline__book__detail__title">${state.title}</div>
          <div class="timeline__book__detail__author">${state.author}</div>
         </div>

    </div>
  `
}
