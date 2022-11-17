const { Op } = require('sequelize');
const { User } = require('../models');
const { isEmptyObject } = require('../utils');
const { randomUUID } = require('crypto');

class UserService {
    constructor(request) {
        this.regBody = request.body;
        this.reqQuery = request.query;
        this.reqParams = request.params;
    }

    createUser() {
        const { login, password, age } = this.regBody;
        const id = randomUUID();
        const isDeleted = false;
        
        return User.create({ id, login, password, age, isDeleted });
    }

    getUsers() {
        const reqQuery = this.reqQuery || {};
        let list = [];

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
    }

    getUserById() {
        const id = this.reqParams.id;

        return User.findByPk(id);
    }

    updateUserById() {
        const { login, password, age } = this.regBody;
        const id = this.reqParams.id;
        
        const user = User.update({
            login, password, age,
        }, {
            where: {
                id,
                isDeleted: false,
            },
            returning: true
        });

        return user;
    }

    deleteUserById() {
        const id = this.reqParams.id;

        const user = User.update({
            isDeleted: true,
        }, {
            where: {
                id,
                isDeleted: false,
            }
        });

        return user;
    }
}

module.exports = UserService;