// @flow
import mongoose from 'mongoose'
import Joi from 'joi'

const EventSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true, trim: true },
    title: { type: String, unique: true, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true }
  },
  {
    collation: 'Event',
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

EventSchema.statics.joiValidate = obj => {
  const schema = {
    date: Joi.date()
      .iso()
      .required(),
    title: Joi.string()
      .max(20)
      .required(),
    description: Joi.string()
      .max(150)
      .required(),
    url: Joi.string()
      .uri()
      .required()
  }
  return Joi.validate(obj, schema, { abortEarly: false })
}

mongoose.model('Event', EventSchema)

export default mongoose.model('Event')
