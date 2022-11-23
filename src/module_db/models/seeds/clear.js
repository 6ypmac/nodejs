const { sequelize } = require('../../config');
const modelLoader = require('../../loaders/model');

(async function clear() {
  try {
    await sequelize.authenticate();

    modelLoader();

    await sequelize.drop();
    await sequelize.close();
  } catch (error) {
    console.error(`Error: ${error}`);
    await sequelize.close();
  }
}());