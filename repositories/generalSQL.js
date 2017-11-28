const execSQL = require('./maria').execQuery
const responser = require('./responser')

const selectAll = (table) => (req, res) => {
  let sql = `SELECT * FROM ${table}`
  execSQL(sql)
    .then((rows) => {
      responser.ok(res, rows)
    })
    .catch((err) => {
      responser.bad(res, err)
    })
}

const selectByID = (table, primaryKeyName) => (req, res) => {
  let sql = `SELECT * FROM ${table} WHERE ${primaryKeyName} = ${req.params.id}`
  execSQL(sql)
    .then((rows) => {
      responser.ok(res, rows[0])
    })
    .catch((err) => {
      responser.bad(res, err)
    })
}

const insertInto = (table) => (req, res) => {
  let obj = req.body.data
  let sql = `Insert into ${table} `
  let valueString = '('
  let columnString = '('
  Object.keys(obj).forEach((key, i) => {
    if (i == Object.keys(obj).length - 1) {
      if (table === 'bills' && key === 'staffNo') valueString += req.profile.staffNo
      else valueString += "'" + obj[key] + "'"
      columnString += key
    }
    else {
      columnString += key + ','
      if (table === 'bills' && key === 'staffNo') valueString += req.profile.staffNo
      else valueString += "'" + obj[key] + "'"
      valueString += ','
    }
  })
  columnString += ')'
  valueString += ')'
  sql += `${columnString} VALUES ${valueString}`
  console.log(sql)
  execSQL(sql)
    .then((rows) => {
      responser.ok(res, rows)
    })
    .catch((err) => {
      console.log(err)
      responser.bad(res, err)
    })
}

const updateTable = (table, primaryKeyName) => (req, res) => {
  let obj = req.body.data
  let sql = `UPDATE ${table} SET `
  Object.keys(obj).forEach((key, i) => {
    if (i == Object.keys(obj).length - 1) {
      if (table === 'bills' && key === 'staffNo') sql += `${key} = '${req.profile.staffNo}' `
      else sql += `${key} = '${obj[key]}' `
    } else
      if (table === 'bills' && key === 'staffNo') sql += `${key} = '${req.profile.staffNo}' ,`
      else sql += `${key} = '${obj[key]}' ,`
  })
  sql += `Where ${primaryKeyName} = ${req.params.id}`
  execSQL(sql)
    .then((rows) => {
      responser.ok(res, rows)
    })
    .catch((err) => {
      responser.bad(res, err)
    })
}


const productName = (req, res) => {
  let name = req.query.name
  let sql = 'Select * FROM product WHERE productName LIKE ' + `"%${name}%"`
  execSQL(sql)
    .then((rows) => {
      responser.ok(res, rows)
    })
    .catch((err) => {
      responser.bad(res, err)
    })
}

const deleteByID = (table, primaryKeyName) => (req, res) => {
  const id = req.params.id
  let sql = `DELETE FROM ${table} WHERE ${primaryKeyName} = ${id}`
  execSQL(sql)
    .then((rows) => {
      responser.ok(res, rows)
    })
    .catch((err) => {
      responser.bad(res, err)
    })
}

module.exports = {
  selectAll,
  selectByID,
  insertInto,
  updateTable,
  deleteByID,
  productName,
}