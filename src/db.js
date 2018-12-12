// @flow
import mongoose from 'mongoose'
import { config } from './config'

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

mongoose.connect(
  config.database,
  { useNewUrlParser: true }
)
