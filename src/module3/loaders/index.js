const userLoader = require('./user');

module.exports = function(app) {
    userLoader(app);
}