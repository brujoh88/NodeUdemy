const jwt = require('jsonwebtoken')
/*=============================
    Verifica token
 ==============================*/

let verificaToken = (req, res, next) => {
  // req = de ahi viene la peticion
  //token = asi se llama, si fuera authorization lo cambio por el mismo
  let token = req.get('token')

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Token no valido',
        },
      })
    }

    req.usuario = decoded.usuario
    next()
  })

  /* res.json({
    token: token,
  }) */
}

/*=============================
    Verifica token
 ==============================*/
let  verificaRole = (req, res, next) => {

  let usuario = req.usuario


  if (usuario.role === 'ADMIN_ROLE'){    
    next()
  } else {

    res.json({
      ok: false,
      err: {
        message: 'El usuario no es administrador'
      }      
    })
  }
}




module.exports = {
  verificaToken,verificaRole
}
