import bcrypt from 'bcrypt-nodejs'

const defaultHashOptions = {
  saltRounds: 10,
  updateCallback: null,
}

function hash(password, options) {
  options = Object.assign(defaultHashOptions, options)
  return new Promise((res, rej) => {
    bcrypt.genSalt(options.saltRounds, (err, salt) => {
      if (err) {
        rej(err)
      } else {
        bcrypt.hash(password, salt, options.updateCallback, (err, hash) => {
          if (err) {
            rej(err)
          } else {
            res(hash)
          }
        })
      }
    })
  })
}

function compare(password, hash) {
  return new Promise((res, rej) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        rej(err)
      } else {
        res(result)
      }
    })
  })
}

export default {
  hash, compare
}
