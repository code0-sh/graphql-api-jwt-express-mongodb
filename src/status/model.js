// @flow
import mongoose from 'mongoose'
import Joi from 'joi'

const StatusSchema = new mongoose.Schema(
  {
    type: { type: String, unique: true, trim: true },
    code: { type: String, trim: true },
    name: { type: String, trim: true }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

StatusSchema.statics.joiValidate = obj => {
  const schema = {
    type: Joi.string()
      .regex(/right | left/)
      .required(),
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

mongoose.model('Status', StatusSchema)

export default mongoose.model('Status')
