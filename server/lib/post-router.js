import auth from './auth'
import express from 'express'
import PostStorage from './post-storage'
import process from 'process'

const DEFAULT_CONNECTION_STR = 'mongodb://localhost:27017/blog'

export function posts(connectionStr) {
  connectionStr = connectionStr || DEFAULT_CONNECTION_STR

  const router = express.Router()
  const postStorage = new PostStorage(connectionStr)
  
  router.get('/post/:id', async (req, res) => {
    try {
      const post = await postStorage.read(req.params.id)
      res.json({data: post})
    } catch (err) {
      res.status(400).json({
        error: {message: err.toString()},
        data: err
      })
    }
  })
  
  router.get('/post', async (req, res) => {
    let {offset, count} = req.query
    offset = offset ? Number(offset) : null
    count = count ? Number(count) : null
    try {
      const posts = await postStorage.list(offset, count)
      res.json({data: posts})
    } catch (err) {
      res.status(400).json({
        error: {message: err.toString()},
        data: err
      })
    }
  })
  
  router.post('/post', auth.requireAuthorization, async (req, res) => {
    try {
      let post = req.body
      post.date = post.date || new Date()
      post = await postStorage.create(req.body)
      res.json({data: post})
    } catch (err) {
      res.status(400).json({
        error: {message: err.toString()},
        data: err
      })
    }
  })
  
  router.put('/post/:id', auth.requireAuthorization, async (req, res) => {
    try {
      let post = req.body
      await postStorage.update(req.params.id, post)
      res.json({})
    } catch (err) {
      res.status(400).json({
        error: {message: err.toString()},
        data: err
      })
    }
  })
  
  router.delete('/post/:id', auth.requireAuthorization, async (req, res) => {
    try {
      await postStorage.delete(req.params.id)
      res.json({})
    } catch (err) {
      res.status(400).json({
        error: {message: err.toString()},
        data: err
      })
    }
  })
  
  return router
}