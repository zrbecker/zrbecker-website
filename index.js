import express from 'express'
import path from 'path'
import process from 'process'
import sslify from 'express-sslify'
import forceDomain from 'express-force-domain';

const app = express()
app.set('port', process.env.PORT || 8080)

if (process.env.FORCE_DOMAIN) {
  app.use(forceDomain(process.env.FORCE_DOMAIN))
}
if (process.env.FORCE_HTTPS) {
  app.use(sslify.HTTPS({ trustProtoHeader: true }))
}
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => console.log('express is listening...'))
