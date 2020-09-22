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
        err,
      })
    }

    req.usuario = decoded.usuario
    next()
  })

  /* res.json({
    token: token,
  }) */
}

module.exports = {
  verificaToken,
}
