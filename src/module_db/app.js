const express = require('express');
const loaders = require('./loaders');
const { config } = require('./config');
const errorLogger = require('./api/middlewares/loggers/error.logger');

function createExpressApp() {
    const app = express();
    const appPort = config.app.port;

    loaders(app);

    // listen for requests
    app.listen(appPort, () => {
        const message = `Server is ready and listening on port ${appPort}`;
        errorLogger.info(message);
    });

    process.on('uncaughtException', error => {
        const message = `${error.stack}`;
        errorLogger.error(message);
    });
    
    process.on('unhandledRejection', () => {
        const message = 'Unhandled rejection was detected within the application';
        errorLogger.error(message);
    });
}

createExpressApp();