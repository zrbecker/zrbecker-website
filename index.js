const process = require('process')

if (process.env.NODE_ENV === 'development') {
  console.log('Starting dev environment.')
  require('babel-register')
  require('./server/server')
} else {
  console.log('Starting prod environment.')
  require('./dist/server/server')
}
