import express from 'express'
import redisClient from './libs/redis/redis'
const PORT = process.env.PORT || 4000

const app = express()

app.get('/', async (req, res) => {
  const visits = await redisClient.get('numVisits')
  const numVisits = !visits ? 0 : parseInt(visits) || 0
  res.json({
    'number_of_visits': numVisits
  })
  redisClient.set('numVisits', numVisits + 1)
})

app.listen(PORT, () => {
  console.log('App listening on port 4000')
})