const express = require('express')
const { config } = require('./config/index')
const router = require('./routes/user')
const { mongoose } = require('./lib/mongo')
const morgan = require('morgan')
const app = express()

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

// app.use('/', (req, res) => {
//   res.send('Hola')
// })

/* app.use('/', router) */


app.listen(config.port, () => {
  console.log(`Servicio escuchando en el puerto ${config.host}:${config.port}`)
})

app.use('/', require('./components/users/routes'))
app.use('/', require('./components/activities/routes'))