const makeMiddlewares = (redisClient) => {
  return {
    checkCache: (req, res, next) => {
      const { id } = req.params
      redisClient.get(id, (err, data) => {
        if (err) {
          console.log(err)
          res.status(500).send(err)
        }
    
        if (data !== null) {
          res.send(data)
        } else {
          next()
        }
      })
    }
  }
}

module.exports = makeMiddlewares