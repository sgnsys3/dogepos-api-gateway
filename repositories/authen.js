const execQuery = require('../repositories/maria').execQuery

const authen = (username, password) => {
  const sql = `SELECT * FROM accounts a JOIN staffs s ON a.acountNo = s.accountNo WHERE (a.username = '${username}') AND (a.password = '${password}')`
  return execQuery(sql)
}

module.exports = authen