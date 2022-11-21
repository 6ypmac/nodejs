const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, printf } = format;

const loggerFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const errorLogger = createLogger({
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        loggerFormat
    ),
    transports: [new transports.Console()]
});

module.exports = errorLogger;