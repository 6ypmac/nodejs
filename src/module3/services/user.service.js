const userModel = require('../models');

class UserService {
    constructor(data, table) {
        this.id = data.body.id;
        this.login = data.body.login,
        this.password = data.body.password,
        this.age = data.body.age,
        this.isDeleted = data.body.isDeleted,
        this.userId = data.params.id,
        this.table = table
    }

    createUser() {
        const data = {
            login: this.login,
            password: this.password,
            age: this.age
        };

        return userModel.create(data);
    }

    getUserById() {
        const data = {
            userId: this.userId,
            table: this.table
        };

        return userModel.getUser(data);
    }

    updateUserById() {
        const data = {
            userId: this.userId,
            table: this.table
        };
        
        const item = userModel.getUser(data);

        if (item) {
            const data = {
                login: this.login || item.login,
                password: this.password || item.password,
                age: this.age || item.age,
                table: this.table,
                item
            };

            return userModel.updateUser(data);
        }

        return false;
    }

    deleteUserById() {
        const data = {
            userId: this.userId,
            table: this.table
        };
        
        const item = userModel.getUser(data);

        if (item) {
            const data = {
                table: this.table,
                item
            };

            return userModel.deleteUser(data);
        }

        return false;
    }
}

module.exports = UserService;