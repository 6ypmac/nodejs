const logger = require('./loggers');

const logUnhandledErrors = (err, req, res, next) => {
    if (err) {
        res.status(500).send(`Failed to process request: ${err.name}, ${err.message}`);
    }
    const message = `[${req.method}] ${req.originalUrl} - ${err.name}, ${err.message}`;
    logger.error(message);
    next();   
}

module.exports = logUnhandledErrors;