const responser = require('../repositories/responser')
const authenticator = require('../repositories/authen')

const authMiddleware = (req, res, next) => {
  const username = req.get('x-auth-username')
  const password = req.get('x-auth-password')
  if(!username || !password) responser.bad(res, 'required auth headers')
  else 
    authenticator(username, password)
      .then((rows) => {
        const parsed = rows[0]
        if(parsed !== undefined) {
          req.profile = parsed
          next()
        }
        else responser.unauthorized(res, 'unauthorized')
      })
      .catch((err) => {
        console.log(err)
        responser.bad(res, 'server error to authen ')
      })
}

module.exports = authMiddleware