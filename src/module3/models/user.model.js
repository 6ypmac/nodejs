const { randomUUID } = require('crypto');

const userModel = {
    create: (data) => { 
        const { login, password, age } = data;

        // create new id
        const newId = randomUUID();

        // create an object of new User
        const newUser = {
            id: newId,
            login,
            password,
            age,
            isDeleted: false
        };

        return newUser;
    },

    getUser: (data) => {
        const { userId, table } = data;

        return table.find(item => item.id === userId);
    },

    updateUser: (data) => {
        const { login, password, age, item, table } = data;
        const { id, isDeleted } = item;

        // update an User record
        const updated = {
            id,
            login,
            password,
            age,
            isDeleted
        };

        // find index of found object from array of users
        const targetIndex = table.indexOf(item);

        // replace object from users list with `updated` object
        table.splice(targetIndex, 1, updated);

        const results = { table, item: updated };        
        
        return results;
    },

    deleteUser: (data) => {
        const { item, table } = data;

        if (table.isDeleted) {
            return false;
        }

        // find index of found object from array of users
        const targetIndex = table.indexOf(item);

        // soft delete user        
        item.isDeleted = true;
        table.splice(targetIndex, 1, item);

        const results = { table, item };        
        
        return results;
    }
};

module.exports = userModel;