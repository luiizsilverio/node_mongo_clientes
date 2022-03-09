const express = require('express')
// const uuid = require('uuid').v4

const db = require('../db/connection')
const { ObjectId } = require('mongodb')

const routes = express.Router()

routes.get('/find', async(req, res) => {
  const { nome, idade, email } = req.query
  let id
  const obj = {}
  if (req.query.id) {
    id = new ObjectId(req.query.id)
    obj._id = id
  }

  if (idade) {
    obj.idade = Number(idade)
  }

  if (nome) {
    obj.nome = nome.toString().trim()
  }

  if (email) {
    obj.email = email.toString().trim()
  }

  try {
    const clientes = await db.getDb()
      .db()
      .collection('clientes')
      .find(obj)
      .toArray()

    res.send(clientes)

  } catch(error) {
    console.log({erro: error})
    res.status(400).send({erro: error})
  }
})


routes.get('/:id', async(req, res) => {
  const id = new ObjectId(req.params.id)

  try {
    const cliente = await db.getDb()
      .db()
      .collection('clientes')
      .findOne({ _id: id })

    res.send(cliente)

  } catch(error) {
    console.log({erro: error})
    res.status(400).send({erro: error})
  }
})


routes.get('/', async(req, res) => {
  try {
    const clientes = await db.getDb()
      .db()
      .collection('clientes')
      .find()
      .toArray()

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
      _id: id,
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


routes.put('/:id', async(req, res) => {
  const { nome, idade, email } = req.body
  const id = new ObjectId(req.params.id)
  const updCliente = {}

  try {
    if (idade) {
      updCliente.idade = Number(idade)
    }

    if (nome) {
      updCliente.nome = nome.toString().trim()
    }

    if (email) {
      updCliente.email = email.toString().trim()
    }

    const newCliente = await db.getDb()
      .db()
      .collection('clientes')
      .updateOne({ _id: id }, {$set: updCliente});

    res.send(newCliente)
    // res.redirect(301, '/')

  } catch(error) {
    console.log({erro: error})
    res.status(400).send({erro: error})
  }
})


routes.delete('/:id', async(req, res) => {
  const id = new ObjectId(req.params.id)

  try {
    const cliente = await db.getDb()
      .db()
      .collection('clientes')
      .deleteOne({ _id: id })

    res.send(cliente)

  } catch(error) {
    console.log({erro: error})
    res.status(400).send({erro: error})
  }
})


module.exports = routes
