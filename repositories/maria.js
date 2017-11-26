require('dotenv').config()
const mariasql = require('mariasql')

const connection = new mariasql({
  host: process.env.MARIA_HOST,
  user: process.env.MARIA_USERNAME,
  password: process.env.MARIA_PASSWORD,
  db: process.env.MARIA_DATABASE,
  charset: process.env.MARIA_CHARSET,
})
connection.connect()

const execQuery = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, row) => {
      if(err) reject(err)
      else resolve(row)
    })
  })
}

const escapString = connection.escape

module.exports = {
  connection,
  execQuery,
  escapString
}