const Joi = require("joi");

const postSchema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().required().min(3),
    phone: Joi.string().required().min(3),
  });

const putSchema = Joi.object().required().min(1)

module.exports = {
    postSchema,
    putSchema
}