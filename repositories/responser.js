const ok = (res, data) => {
  res.send({
    status: 200,
    data: data,
  })
}

const bad = (res, cause) => {
  res.status(400)
  res.send({
    status: 400,
    cause,
  })
}

const unauthorized = (res, cause = 'Unauthorized') => {
  res.status(401)
  res.send({
    status: 401,
    cause,
  })
}

const notFound = (res, cause = 'Not Found') => {
  res.status(404)
  res.send({
    status: 404,
    cause,
  })
}

const error = (res, cause = 'internal server error') => {
  res.status(500)
  res.send({
    status: 500,
    cause,
  })
}

module.exports = {
  ok,
  bad,
  unauthorized,
  notFound,
  error,
}