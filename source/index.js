var css = require('sheetify')
var choo = require('choo')

// styles
css('nanoreset')
css('./index.css')

// our app
var app = choo()
app.use(require('enoki/choo')())
app.route('*', require('./views/default'))

// start
if (!module.parent) app.mount('body')
else module.exports = app
