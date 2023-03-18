const Joi = require('joi')
const validation = Joi.object({
    name : Joi.string().min(3).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(3).max(25).required(),
    mobile : Joi.string().min(10).max(10).required(),
    company_name : Joi.string().required(),
    website_url : Joi.string().required()

})
module.exports = validation