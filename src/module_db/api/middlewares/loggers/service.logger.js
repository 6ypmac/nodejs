const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, printf } = format;

const loggerFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        loggerFormat
    ),
    transports: [new transports.Console()]
});

const serviceMethodLogger = (req, res, next) => {
    const { method, originalUrl, query, body } = req;
    const message = `[${method}] ${originalUrl} - query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`;
    logger.info(message);
    next();
}

module.exports = serviceMethodLogger;