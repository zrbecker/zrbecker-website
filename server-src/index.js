import express from 'express'
import path from 'path'
import process from 'process'
import httpsSecurity from './lib/https-security'

const app = express()

app.set('domain', process.env.DOMAIN || null)
app.set('https', process.env.HTTPS || false)
app.set('port', process.env.PORT || 8080)

app.use(httpsSecurity.secure(
  app.get('domain'), app.get('https'), {trustProtoHeader: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
  const protocol = app.get('https') ? 'https' : 'http'
  const domain = app.get('domain') ? app.get('domain') : 'localhost'
  const port = app.get('port')
  console.log(`express is listening... ${protocol}://${domain}:${port}`)
})
