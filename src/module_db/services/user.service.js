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

    async getUserById() {
        const id = this.reqParams.id;

        try {
            const user = await User.findByPk(id);
        
            return user;            
        } catch (error) {
            return;
        }
    }

    async updateUserById() {
        const { login, password, age } = this.regBody;
        const id = this.reqParams.id;

        try {
            const user = await User.findByPk(id);

            user.login = login;
            user.password = password;
            user.age = age;
        
            await user.save();
        
            return user;            
        } catch (error) {
            return;
        }
    }

    async deleteUserById() {
        const id = this.reqParams.id;

        try {
            const user = await User.findByPk(id);

            user.isDeleted = true;
        
            await user.save();
        
            return user;            
        } catch (error) {
            return;
        }
    }
}

module.exports = UserService;