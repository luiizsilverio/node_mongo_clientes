const express = require('express')
// const uuid = require('uuid').v4

const db = require('../db/connection')
const { ObjectId } = require('mongodb')

const routes = express.Router()

routes.get('/', async(req, res) => {
  try {

    const clientes = await db.getDb()
      .db()
      .collection('clientes')
      .find()
      .toArray()

    console.log(clientes)
    res.send(clientes)

  } catch(error) {
    console.log({erro: error})
    res.status(400).send({erro: error})
  }
})

routes.post('/', (req, res) => {
  try {
    const { nome, idade, email } = req.body

    if (!nome) {
      res.status(400).send({erro: "Nome obrigatório"})
    }
    if (!idade) {
      res.status(400).send({erro: "Idade obrigatória"})
    }
    if (!email) {
      res.status(400).send({erro: "E-mail obrigatório"})
    }

    const id = new ObjectId(req.params.id)

    const newCliente = {
      id,
      nome,
      idade,
      email
    }

    db.getDb()
      .db()
      .collection('clientes')
      .insertOne(newCliente)

    res.status(301).send(newCliente)
    // res.redirect(301, '/')

  } catch(error) {
    console.log({erro: error})
    res.status(400).send({erro: error})
  }
})


module.exports = routes
