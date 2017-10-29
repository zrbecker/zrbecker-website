import AuthStorage from './auth-storage'
import express from 'express'
import rules from 'password-rules'

export function loginRouter(connectionStr) {
  const router = express.Router()
  const authStorage = new AuthStorage(connectionStr)

  // TODO(zrbecker): This needs some kind of email verification.
  router.post('/register', async (req, res) => {
    try {
      const {username, password, verifyPassword} = req.body

      if (!username) {
        res.status(400).json({error: {message: 'Username required'}})
      }

      if (!password) {
        res.status(400).json({error: {message: 'Password required'}})
      }

      if (password != verifyPassword) {
        res.status(400).json({error: {message: 'Passwords must match'}})
      }

      if (username.length < 3) {
        res.status(400).json({
          error: {message: 'Username must be longer than 3 characters.'}
        })
      }

      const errors = rules(password, {maximumLength: 70, requireSpecial: true})
      if (errors) {
        res.status(400).json(errors)
      }

      const id = await authStorage.register(username, password)
      res.json({id})
    } catch (err) {
      console.error(err)
      res.status(500).json('Server Error')
    }
  })

  router.post('/login', (req, res) => {
    res.status(501).send('Not Implemented')
  })

  return router
}

export function authMiddleware() {
  const router = express.Router()

  router.use((req, res, next) => {
    next()
  })

  return router
}
