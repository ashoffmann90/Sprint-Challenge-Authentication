const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('./auth-model')
const jwt = require('jsonwebtoken')
const restricted = require('./authenticate-middleware')

function isValid(user) {
  return Boolean(user.username && user.password && typeof user.password === "string");
}

router.post('/register', (req, res) => {
  // implement registration
  const {username, password} = req.body

  if(isValid(req.body)){

    Users.add({username, password: bcrypt.hashSync(password, 8)})
    .then(user => {
      res.status(201).json({username: username})
    })
    .catch(e => {
      res.status(500).json({ error: e.message})
    })
  } else {
    res.status(400).json({ error: 'Please provide username and password'})
  }
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body

  if(isValid(req.body)){
    Users.findByUsername(username)
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user)
        res.status(201).json({ message: 'Login success', username: username, token})
      }
    })
    .catch(e => {
      res.status(500).json({ error: e.message})
    })
  } else {
    res.status(403).json({ error: 'Invalid username and password'})
  }
});

function generateToken(user){
  const payload = {
    username: user.username,
    password: user.password
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, process.env.JWT_SECRET || 'somethingsupersecret', options)
}

module.exports = router;
