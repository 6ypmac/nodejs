const Joi = require('joi');

// Joi validation
const userGroupValidationSchema = Joi.object({
    userIds: Joi.array().unique().items(Joi.string()).required()
});

const userGroupValidator = (schema) => (req, res, next) => {
    console.log('req.body: ' + JSON.stringify(req.body, null, 4));
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

module.exports = userGroupValidator(userGroupValidationSchema);