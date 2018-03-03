require('./design')

var choo = require('choo')

// our app
var app = choo()
app.use(require('enoki/choo')())
app.use(require('./plugins/scroll'))
app.route('*', require('./views/wrapper'))

// start
if (!module.parent) app.mount('body')
else module.exports = app
