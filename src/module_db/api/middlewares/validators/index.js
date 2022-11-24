const userValidator = require('./user.validator');
const groupValidator = require('./group.validator');
const userGroupValidator = require('./user.group.validator');
const loginValidator = require('./login.validator');

module.exports = {
    userValidator,
    groupValidator,
    userGroupValidator,
    loginValidator
}