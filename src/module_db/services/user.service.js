const { Op } = require('sequelize');
const { User } = require('../models');
const { isEmptyObject } = require('../utils');
const { randomUUID } = require('crypto');
const { serviceMethodLogger } = require('../api/middlewares');

class UserService {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    createUser() {
        const { login, password, age } = this.req.body;
        const id = randomUUID();
        const isDeleted = false;

        try {
            return User.create({ id, login, password, age, isDeleted });
        } catch (error) {
            serviceMethodLogger(error, this.req, this.res, this.next);
        }
    }

    getUsers() {
        const reqQuery = this.req.query || {};
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
            serviceMethodLogger(error, this.req, this.res, this.next);
        }        
    }

    async getUserById() {
        const id = this.req.params.id;
        console.log('id: ' + id);

        try {
            const user = await User.findByPk(id);

            return user;            
        } catch (error) {            
            serviceMethodLogger(error, this.req, this.res, this.next);
        }
    }

    async getUserByCredentials() {
        const { login, password } = this.req.body;

        try {
            const user = await User.findOne({
                where: {
                    login,
                    password
                }
            });

            return user;
        } catch (error) {
            serviceMethodLogger(error, this.req, this.res, this.next);
        }
    }

    async updateUserById() {
        const { login, password, age } = this.req.body;
        const id = this.req.params.id;

        try {
            const user = await User.findByPk(id);

            user.login = login;
            user.password = password;
            user.age = age;
        
            await user.save();
        
            return user;            
        } catch (error) {
            serviceMethodLogger(error, this.req, this.res, this.next);
        }
    }

    async deleteUserById() {
        const id = this.req.params.id;

        try {
            const user = await User.findByPk(id);

            user.isDeleted = true;
        
            await user.save();
        
            return user;            
        } catch (error) {
            serviceMethodLogger(error, this.req, this.res, this.next);
        }
    }
}

module.exports = UserService;