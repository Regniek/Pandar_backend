const express = require('express')
const { config } = require('./config/index')
const router = require('./routes/user')
const { mongoose } = require('./lib/mongo')
const app = express()

app.use(express.json({ extended : true }))
app.use(express.urlencoded({ extended : true }))

// app.use('/', (req, res) => {
//   res.send('Hola')
// })

/* app.use('/', router) */

app.use('/', require('./components/users/routes'))

app.listen(config.port, () => {
  console.log(`Servicio escuchando en el puerto ${config.host}:${config.port}`)
})
