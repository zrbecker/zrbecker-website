import express from 'express'
import forceDomain from 'express-force-domain'
import sslify from 'express-sslify'
import url from 'url'

function makeUrl(domain, https) {
  if (domain && !url.parse(domain).protocol) {
    domain = (https) ? 'https://' + domain : 'http://' + domain
  }
  return domain
}

function secure(domain, https, options) {
  const router = express.Router()
  if (domain) {
    router.use(forceDomain(makeUrl(domain, https)))
  }
  if (https) {
    router.use(sslify.HTTPS(options))
  }
  return router
}

export default {secure}
