const Joi = require('joi');

// Joi validation
const userValidationSchema = Joi.object({
    login: Joi.string().alphanum().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    age: Joi.number().min(1).max(150).required(),
});

const userValidator = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(422).json({
            status: 'error',
            message: 'Invalid request data'
        });
    } else {
        next();
    }
};

module.exports = userValidator(userValidationSchema);