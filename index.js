const express = require('express')
const redis = require('redis')
const router = require('./router')

const port_redis = process.env.PORT || 6379
const port = process.env.PORT || 5000

const redisClient = redis.createClient(port_redis)

const app = express()
router(app, redisClient)

app.listen(port, () => console.log(`Server running on Port ${port}`))