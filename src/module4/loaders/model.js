const { User, Group, UserGroup } = require('../models/index');

const modelLoader = () => {
    User;
    Group;
    UserGroup;
}

module.exports = modelLoader;