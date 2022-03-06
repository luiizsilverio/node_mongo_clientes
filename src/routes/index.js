const Router = require('express')
const clientesRouter = require('./clientes.routes')

const routes = Router()

routes.get('/', (req, res) => {
  try {
    res.send({message: 'Clientes_Mongo API 🤠'})
  } catch(error) {
    console.log({erro: error})
    res.status(400).send({erro: error})
  }
})

routes.use('/clientes', clientesRouter)


module.exports = routes