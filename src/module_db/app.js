const loaders = require('./loaders');
const { config } = require('./config');
const app = require('./loaders/express.app');
const logger = require('./api/middlewares/loggers');

function createExpressApp() {
    const appPort = config.app.port;

    loaders();

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