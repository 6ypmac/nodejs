const { sequelize } = require('../config');
const modelLoader = require('./model');
const logger = require('../api/middlewares/loggers');

module.exports = async function(app) {    
    try {
        await sequelize.authenticate();
        
        const message = 'Connection has been established successfully';
        logger.info(message);
    } catch (error) {
        const message = `Unable to connect to the database: ${error}`;
        logger.error(message);
    }    

    modelLoader();
}