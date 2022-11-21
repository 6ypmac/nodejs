const logger = require('./loggers');

const serviceMethodLogger = (err, req, res, next) => {
    const message = `[${req.method}] ${req.originalUrl} - query: ${JSON.stringify(req.query)}, body: ${JSON.stringify(req.body)} - ${err.message}`;
    logger.error(message);
    next();
}

module.exports = serviceMethodLogger;