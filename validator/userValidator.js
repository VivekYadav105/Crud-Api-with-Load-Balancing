const Joi = require('joi')

const userValidator = Joi.object().keys({
    _id:Joi.string().uuid(),
    username:Joi.string().required(),
    hobbies:Joi.array().items(Joi.string())
})

module.exports = userValidator