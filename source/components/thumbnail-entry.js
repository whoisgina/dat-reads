var html = require('choo/html')
var css = require('sheetify')

var styles = css`

`

module.exports = thumbnailEntry

function thumbnailEntry (props, emit) {
  props = props || { }
  return html`
    <article class="${styles}">
      ${props.title} 
    </article>
  `
}
