const express = require('express');
const app = express();

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Banco de dados
const db = require('./db/connection')

db.initDb((err, db) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log('Conectou no banco com sucesso')
      app.listen(8000, () => {
        console.log(`Notes_Mongo rodando na porta ${port}`)
      })
    }
  })