const { errorLogger } = require('./loggers/error.logger');

const logUnhandledErrors = (err, req, res, next) => {
    if (err) {
        res.status(500).send('Failed to process');
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    next();
}

module.exports = logUnhandledErrors;