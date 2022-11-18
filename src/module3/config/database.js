const Sequelize = require('sequelize');
const { db } = require('./envConstants');

const sequelize = new Sequelize(db.name, db.user, db.password, {
    host: db.host,
    port: db.port,
    dialect: 'postgres',
    define: {
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = sequelize;
