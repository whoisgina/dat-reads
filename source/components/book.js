var dateFormat = require('dateformat')
var ov = require('object-values')
var html = require('choo/html')
var content = require('./content')

module.exports = book

function displayTags (tag) {
  return html`
  <span class="book__tag">${tag}</span>
  `
}

function displayCover (book) {
  return html`
  <img class="book__cover" src="${book.path}">
  `
}

function image (image) {
  return html`
    <img class="book__cover" src="${image.path}" />
  `
}


function book (state, emit) {
  var dateStarted = dateFormat(new Date(state.dateStarted), 'mmmm dS')
  var dateCompleted = dateFormat(new Date(state.dateCompleted), 'mmmm dS')

  var images = state.files
    ? ov(state.files).filter(file => file.type === 'image')
    : false

  return html`
    <div class="book">
      <img class="book__cover" src="">
      ${images ? images.map(image) : ''}
      <div class="book__title">${state.title}</div>
      <div class="book__author">${state.author}</div>
      <div class="book__dates-read">${dateStarted} - ${dateCompleted}</div>

      <div class="book__tags">
        ${state.tags ? state.tags.map(displayTags) : ''}
      </div>

    </div>
  `
  // ${content(state.notes)}
}


