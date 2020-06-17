const express = require('express')
const app = express()
//Para encriptar
const bcrypt = require('bcryptjs')
const _ = require('underscore')
// Traigo del folder models el Schema Usuario
const Usuario = require('../models/usuario')

app.get('/usuario', (req, res) => {
  //Aqui busca segun lo que le ponga en find
  let desde = req.query.desde || 0
  desde = Number(desde)
  let hasta = req.query.hasta || 5
  hasta = Number(hasta)

  Usuario.find({ estado: true }, 'nombre email role google estado img')
    .skip(desde)
    .limit(hasta)
    //ejecutalo
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        })
      }

      Usuario.countDocuments({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          usuarios, // Es = usarios: usuarios,
          cuantos: conteo,
        })
      })
    })
})

app.post('/usuario', (req, res) => {
  let body = req.body

  //Completo los datos del nuevo objeto Usuario con los datos aportados por el body de mi peticion
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  })

  // Para grabar

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      })
    }
    //usuarioDB.password = null
    res.json({
      ok: true,
      usuario: usuarioDB,
    })
  })
})

app.put('/usuario/:id', (req, res) => {
  let idUser = req.params.id
  let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

  //delete body.password
  //delete body.google

  Usuario.findByIdAndUpdate(
    idUser,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        })
      }
      res.json({
        ok: true,
        usuario: usuarioDB,
      })
    }
  )
})

//!DELETE = Cambio el valor del documento valor "estado" en  false
app.delete('/usuario/:id', (req, res) => {
  let idUser = req.params.id,
    cambiaEstado = {
      estado: false,
    }
  //Primero busco el usuario con el ID y veo su estado
  Usuario.findById(idUser, (err, usuario) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      })
    }

    if (usuario.estado === false) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no encontrado',
        },
      })
    }
    Usuario.findByIdAndUpdate(
      idUser,
      cambiaEstado,
      { new: true },
      (err, usuarioDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          })
        }
        res.json({
          ok: true,
          usuario: usuarioDB,
        })
      }
    )
  })
})

var bodyParser = require('body-parser')
app.use(bodyParser.json())

module.exports = app

/* 
!Este DELETE BORRA COMPLETAMENTE EL DOCUMENTO
app.delete('/usuario/:id', (req, res) => {
  let id = req.params.id

  Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      })
    }
    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no encontrado',
        },
      })
    }
    res.json({
      ok: true,
      usuario: usuarioBorrado,
    })
  })
}) */
