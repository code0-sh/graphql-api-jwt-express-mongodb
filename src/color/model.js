// @flow
import mongoose from 'mongoose'
import Joi from 'joi'

const ColorSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, required: true, trim: true },
    name: { type: String, unique: true, required: true, trim: true }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

ColorSchema.statics.joiValidate = obj => {
  const schema = {
    code: Joi.string()
      .min(4)
      .max(7)
      .required(),
    name: Joi.string()
      .min(2)
      .max(30)
      .required()
  }
  return Joi.validate(obj, schema, { abortEarly: false })
}

mongoose.model('Color', ColorSchema)

export default mongoose.model('Color')
