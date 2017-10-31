import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import featureFlags from './lib/feature-flags'
import httpsSecurity from './lib/https-security'
import path from 'path'
import {posts} from './lib/post-router'
import process from 'process'

const app = express()

app.set('domain', process.env.DOMAIN || null)
app.set('https', process.env.HTTPS || false)
app.set('port', process.env.PORT || 8080)

app.use(httpsSecurity.secure(
  app.get('domain'), app.get('https'), {trustProtoHeader: true}))

const PUBLIC_DIR = process.env.NODE_ENV === 'development'
  ? '../dist/public' : '../public'
app.use(express.static(path.join(__dirname, PUBLIC_DIR)))
app.use(bodyParser.json())
app.use(cookieParser())

if (featureFlags.blogApi) {
  const connectionStr = process.env.MONGODB_CONNECTION_STR || null
  app.use('/api/blog', posts(connectionStr))
}

app.listen(app.get('port'), () => {
  const protocol = app.get('https') ? 'https' : 'http'
  const domain = app.get('domain') ? app.get('domain') : 'localhost'
  const port = app.get('port')
  console.log(`express is listening... ${protocol}://${domain}:${port}`)
})
