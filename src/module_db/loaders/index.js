const { sequelize } = require('../config');
const databaseLoader = require('./database');
const modelLoader = require('./model');
// const { errorLogger } = require('../api/middlewares/loggers/error.logger');

module.exports = async function(app) {
    try {
        await sequelize.authenticate();

        databaseLoader(app);
        modelLoader();
    } catch (error) {
        // process.on('uncaughtException', error => {
        //     const message = `${error.name} ${error.message}, ${error.stack}`;
        //     errorLogger.error(message);
        // });
        
        // process.on('unhandledRejection', () => {
        //     const message = 'Unhandled rejection was detected within the application';
        //     errorLogger.error(message);
        // });
    }
}