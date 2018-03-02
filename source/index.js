require('./design')

var choo = require('choo')

// our app
var app = choo()
app.use(require('enoki/choo')())
app.route('*', require('./views/default'))

// start
if (!module.parent) app.mount('body')
else module.exports = app
