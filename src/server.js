const express = require('express');
const app = express();

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routes = require('./routes')
app.use(routes)

// Banco de dados
const db = require('./db/connection')

db.initDb((err, db) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log('Conectou no banco com sucesso')
      app.listen(port, () => {
        console.log(`Clientes_Mongo rodando na porta ${port}`)
      })
    }
  })