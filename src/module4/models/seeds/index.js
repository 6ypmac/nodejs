const { sequelize } = require('../../config');
const modelLoader = require('../../loaders/model');
const createUsers = require('./user');
const createGroups = require('./group');
const createUserGroups = require('./user.group');

(async function seed() {
    try {
      await sequelize.authenticate();
  
      modelLoader();
  
      await createUsers();
      await createGroups();
      await createUserGroups();
  
      await sequelize.close();
    } catch (error) {
      console.error(`Error: ${error}`);
      await sequelize.close();
    }
}());