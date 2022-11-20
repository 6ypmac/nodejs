const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, label, printf } = format;

const loggerFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        colorize(),
        label({ label: 'service method' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        loggerFormat
    ),
    transports: [new transports.Console()]
});

const serviceMethodLogger = (req, res, next) => {
    const { method, path, query, body } = req;
    const message = `[${method}] ${path} - query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`;
    logger.info(message);
    next();
}

module.exports = serviceMethodLogger;