import express from 'express'
import bodyParser from 'body-parser'

import { allAirports } from '../models/airport'

const app = express()
app.use(bodyParser.json())

app.all('/airports', async (_req, res) => {
  const airports = await allAirports()

  res.json(airports)
})

module.exports = app
