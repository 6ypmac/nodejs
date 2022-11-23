const jwt = require('jsonwebtoken');
const { UserService } = require('../services');
const { serviceMethodLogger } = require('../api/middlewares');
const { jwtSecret } =require('../config/env.constants');

const getJwtToken = async (req, res, next) => {
    try {
        const userService = new UserService(req, res, next);
        const user = await userService.getUserByCredentials();

        if (user) {
            const { login, password } = user;
            const token = jwt.sign({ login, password }, jwtSecret, { expiresIn: "300s" });
            
            res.status(200).send({ token });
        } else {
            res.status(400).send('Incorrect login/password combination');
        }
    } catch (error) {
        serviceMethodLogger(error, req, res, next);
        return next(error);
    }
}

module.exports = {
    getJwtToken
};
