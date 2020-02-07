import express from 'express'

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})


// Add POST - /api/login
router.post('/login', (req, res) => {
  var datas = require("./user.data");
  let samePassword = false
  datas.forEach( (val, index) => {
    if (req.body.username === val.username && req.body.password === val.password) {
      samePassword = true
    }
  })
  if(samePassword){
    req.session.authUser = { username: req.body.username }
    return res.json({ username: req.body.username })
  }
  res.status(401).json({ message: 'Masukkan Password' })
})

// Add POST - /api/register
router.post('/register', (req, res) => {
  if (req.body.username !== '' || req.body.password !== '') {
    var mod = require("./user.data");
    mod.push({ username: req.body.username, password: req.body.password });
    req.session.authUser = { username: req.body.username }
    return res.json({ username: req.body.username })
  }
  res.status(401).json({ message: 'Masukkan Username dan Password' })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
