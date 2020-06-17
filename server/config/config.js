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
                BASE DE DATOS
========================================
*/
let UrlDb

//if (process.env.NODE_ENV === 'dev') {
//  UrlDb = 'mongodb://localhost:27017/cafe'
//} else {
UrlDb = process.env.atlasConfig // mongodb+srv://db_user_udemy:<password>@cluster0-ug9wc.mongodb.net/test
//}
//URLDB es inventado por mi (enviroment)
process.env.URLDB = UrlDb
