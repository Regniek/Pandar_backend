const express = require('express')
const { config } = require('./config/index')
const router = require('./routes/index')
const app = express()




// app.use('/', (req, res) => {
//   res.send('Hola')
// })


app.use('/', router)


app.listen(config.port, () => {
  console.log(`Servicio escuchando en el puerto ${config.host}:${config.port}`)
})