require('../../.env/env')
/* 
========================================
                Puerto
========================================
*/
process.env.PORT = process.env.PORT || 3000

/* 
========================================
                Entorne
========================================
*/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/* 
========================================
         Fecha caducidad token
========================================
60 seg
60 min
24 hr
30 days
*/
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

/* 
========================================
         semilla de autenticacion
========================================
*/
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'
/* 
========================================
                BASE DE DATOS
========================================
*/
let UrlDb

if (process.env.NODE_ENV === 'dev') {
  UrlDb = 'mongodb://localhost:27017/cafe'
} else {
  UrlDb = process.env.atlasConfig // mongodb+srv://db_user_udemy:<password>@cluster0-ug9wc.mongodb.net/test
}
//URLDB es inventado por mi (enviroment)
process.env.URLDB = UrlDb
