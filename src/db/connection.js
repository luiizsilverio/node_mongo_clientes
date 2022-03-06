const {MongoClient} = require('mongodb')

// notesDb é o nome do banco de dados
const url = "mongodb://localhost:27017"
const dbName = "clientes"

let db;

const initDb = (callback) => {
  MongoClient.connect(url, { useUnifiedTopology: true })
    .then((client) => {
      db = client.db(dbName)
      callback(null, db)
    })
    .catch((err) => {
      callback(err)
    })
}

const getDb = () => {
  return db
}

module.exports = {
  initDb,
  getDb
}