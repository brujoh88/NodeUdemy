const express = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
const { post } = require('./usuario')
const app = express()

app.post('/login', function (req, res) {
  res.json({
    ok: true,
  })
})

module.exports = app
