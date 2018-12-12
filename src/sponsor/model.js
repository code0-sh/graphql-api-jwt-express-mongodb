// @flow
import mongoose from 'mongoose'
import Joi from 'joi'

const SponsorSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, trim: true },
    src: { type: String, unique: true, required: true, trim: true },
    url: { type: String, unique: true, required: true, trim: true }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

SponsorSchema.statics.joiValidate = obj => {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    src: Joi.string()
      .uri()
      .required(),
    url: Joi.string()
      .uri()
      .required()
  }
  return Joi.validate(obj, schema, { abortEarly: false })
}

mongoose.model('Sponsor', SponsorSchema)

export default mongoose.model('Sponsor')
