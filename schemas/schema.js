const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().required().min(3),
  phone: Joi.string().required().min(3),
  favorite: Joi.boolean()
});

const putSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().min(3),
  phone: Joi.string().min(3),
}).required().min(1)

const patchSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': "missing field favorite"
  })
})

const authSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business')
})

const verifySchema = Joi.object({
  email: Joi.string().required()
})

module.exports = {
  postSchema,
  putSchema,
  patchSchema,
  authSchema,
  subscriptionSchema,
  verifySchema
}