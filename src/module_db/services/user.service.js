const { Op } = require('sequelize');
const { User } = require('../models');
const { isEmptyObject } = require('../utils');
const { randomUUID } = require('crypto');
const errorLogger = require('../api/middlewares/loggers/error.logger');

class UserService {
    constructor(request) {
        this.reqBody = request.body;
        this.reqQuery = request.query;
        this.reqParams = request.params;
    }

    createUser() {
        const { login, password, age } = this.reqBody;
        const id = randomUUID();
        const isDeleted = false;

        try {
            return User.create({ id, login, password, age, isDeleted });
        } catch (error) {
            const message = `${error.stack}`;
            errorLogger.error(message);
        }
    }

    getUsers() {
        const reqQuery = this.reqQuery || {};
        let list = [];

        try {
            if (!isEmptyObject(reqQuery)) {
                const {
                    loginSubstring,
                    limit
                } = reqQuery;
        
                list = User.findAll({
                    where: {
                        login: {
                            [Op.iLike]: `%${loginSubstring}%`,
                        },
                    },
                    order: ['login'],
                    limit,
                });
            } else {
                list = User.findAll();
            }
    
            return list;
        } catch (error) {
            const message = `${error.stack}`;
            errorLogger.error(message);
        }        
    }

    async getUserById() {
        const id = this.reqParams.id;

        try {
            const user = await User.findByPk(id);
        
            return user;            
        } catch (error) {
            const message = `${error.stack}`;
            errorLogger.error(message);
        }
    }

    async updateUserById() {
        const { login, password, age } = this.reqBody;
        const id = this.reqParams.id;

        try {
            const user = await User.findByPk(id);

            user.login = login;
            user.password = password;
            user.age = age;
        
            await user.save();
        
            return user;            
        } catch (error) {
            const message = `${error.stack}`;
            errorLogger.error(message);
        }
    }

    async deleteUserById() {
        const id = this.reqParams.id;

        console.log("id: " + id);

        try {
            const user = await User.findByPk(id);

            user.isDeleted = true;
        
            await user.save();
        
            return user;            
        } catch (error) {
            const message = `${error.stack}`;
            errorLogger.error(message);
        }
    }
}

module.exports = UserService;