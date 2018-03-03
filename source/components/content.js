var implicitFigures = require('markdown-it-implicit-figures')
var Markdown = require('markdown-it')
var raw = require('choo/html/raw')

var md = new Markdown()

md.use(implicitFigures, {
  dataType: false,
  figcaption: false 
})

module.exports = content

function content (str) {
  return raw(md.render(str)) 
}
