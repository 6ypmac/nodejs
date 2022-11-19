const { sequelize } = require('../config');
const databaseLoader = require('./database');
const modelLoader = require('./model');

module.exports = function(app) {
    sequelize
        .authenticate()
        .then(() => {
            console.log("Connection has been established successfully.");
        })
        .catch((err) => {
            console.error("Unable to connect to the database:", err);
        });

    databaseLoader(app);
    modelLoader();
}