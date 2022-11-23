const { UserService } = require('../services');
const { serviceMethodLogger } = require('../api/middlewares');

const createUser = async (req, res, next) => {
    try {
        const userService = new UserService(req, res, next);
        const user = await userService.createUser();

        if (user) {
            res.setHeader('Location', `${req.path}/${user.id}`);
            res.status(201).send(user);
        } else {
            const message = 'Entry was not added to the database table.';
            const err = { message };
            res.status(400).send(message);
            serviceMethodLogger(err, req, res, next);
        }        
    } catch (error) {
        serviceMethodLogger(error, req, res, next);
        return next(error);
        
    }
};

const getUsers = async (req, res, next) => {
    try {
        const userService = new UserService(req, res, next);
        const list = await userService.getUsers();
        
        if (list) {
            res.status(200).send(list);
        } else {
            const message = 'Users not found.';
            const err = { message };
            res.status(404).send(message);
            serviceMethodLogger(err, req, res, next);
        }        
    } catch (error) {
        serviceMethodLogger(error, req, res, next);
        return next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const userService = new UserService(req, res, next);
        const user = await userService.getUserById();
    
        if (user) {
            res.status(200).send(user);
        } else {
            const message = 'User with this ID is not exist.';
            const err = { message };
            res.status(404).send(message);
            serviceMethodLogger(err, req, res, next);
        }
    } catch (error) {
        serviceMethodLogger(error, req, res, next);
        return next(error);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const userService = new UserService(req, res, next);    
        const user = await userService.updateUserById();

        if (user) {
            res.status(202).send(user);
        } else {
            const message = 'User with this ID is not exist.';
            const err = { message };
            res.status(404).send(message);
            serviceMethodLogger(err, req, res, next);
        }
    } catch (error) {
        serviceMethodLogger(error, req, res, next);
        return next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const userService = new UserService(req, res, next);
        const user = await userService.deleteUserById();

        if (user) {
            res.status(204).send(user);
        } else {
            const message = 'User with this ID is not exist.';
            const err = { message };
            res.status(404).send(message);
            serviceMethodLogger(err, req, res, next);
        }
    } catch (error) {
        serviceMethodLogger(error, req, res, next);
        return next(error);
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
};