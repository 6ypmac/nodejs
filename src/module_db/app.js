const express = require('express');
const loaders = require('./loaders');
const { config } = require('./config');
const logger = require('./api/middlewares/loggers');

function createExpressApp() {
    const app = express();
    const appPort = config.app.port;

    loaders(app);

    // listen for requests
    app.listen(appPort, () => {
        const message = `Server is ready and listening on port ${appPort}`;
        logger.info(message);
    });    

    process.on('uncaughtException', error => {
        const message = `${error.stack}`;
        logger.error(message);
    });
    
    process.on('unhandledRejection', () => {
        const message = 'Unhandled rejection was detected within the application';
        logger.error(message);
    });
}

createExpressApp();