const Joi = require('joi');
const { constants } = require('../../config');

const { READ, WRITE, DELETE, SHARE, UPLOAD_FILES } = constants.PERMISSONS;

// Joi validation
const groupValidationSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().unique().min(1).max(5).items(
        Joi.string().valid(READ),
        Joi.string().valid(WRITE),
        Joi.string().valid(DELETE),
        Joi.string().valid(SHARE),
        Joi.string().valid(UPLOAD_FILES),
    ).required(),
});

const groupValidator = (schema) => (req, res, next) => {
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

module.exports = groupValidator(groupValidationSchema);