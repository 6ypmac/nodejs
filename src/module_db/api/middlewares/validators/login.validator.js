const Joi = require('joi');

// Joi validation
const loginValidationSchema = Joi.object({
    login: Joi.string().alphanum().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

const loginValidator = (schema) => (req, res, next) => {    
    const { error } = schema.validate(req.body);
    if (error?.isJoi) {
        res.status(400).json(error.message);
    } else {
        next();
    }
};

module.exports = loginValidator(loginValidationSchema);