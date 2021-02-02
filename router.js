const axios = require('axios')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const makeMiddlewares = require('./middlewares')

const router = (app, redisClient) => {
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
  app.use(morgan('dev'))

  const { checkCache } = makeMiddlewares(redisClient)

  app.get('/starships/:id', checkCache, async (req, res) => {
    try {
      const { id } = req.params
      const starShipInfo = await axios(`https://swapi.dev/api/starships/${id}`)

      const starShipInfoData = starShipInfo.data
      redisClient.setex(id, 3600, JSON.stringify(starShipInfoData));
      
      return res.json(starShipInfoData)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  })
}

module.exports = router