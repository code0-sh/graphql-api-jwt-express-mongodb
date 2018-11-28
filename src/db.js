// @flow
import mongoose from 'mongoose'
import { config } from './config'

mongoose.set('useCreateIndex', true)

mongoose.connect(
  config.database,
  { useNewUrlParser: true }
)
