import process from 'process'

function requireAuthorization(req, res, next) {
  if (!!process.env.TEMP_AUTHORIZED) {
    next()
  } else {
    res.status(401).json({error: {message: 'Unauthorized'}})
  }
}

export default { requireAuthorization }