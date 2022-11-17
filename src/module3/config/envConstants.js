const dotenv = require('dotenv');

const env = dotenv.config();

if (env.error) {
  throw new Error(env.error.message);
}

module.exports = {
    app: {
        port: parseInt(process.env.APP_PORT, 10),
    },
  
    db: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
};