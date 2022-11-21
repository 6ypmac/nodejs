const { sequelize } = require('../config');
const databaseLoader = require('./database');
const modelLoader = require('./model');
const errorLogger = require('../api/middlewares/loggers/error.logger');

module.exports = async function(app) {    
    try {
        await sequelize.authenticate();
        
        const message = 'Connection has been established successfully';
        errorLogger.info(message);
    } catch (error) {
        const message = `Unable to connect to the database: ${error}`;
        errorLogger.error(message);
    }    

    databaseLoader(app);
    modelLoader();
}