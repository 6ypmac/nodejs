const { UserService } = require('../services');

const createUser = async (req, res, next) => {
    try {
        const userService = new UserService(req);
        const user = await userService.createUser();

        res.setHeader('Location', `${req.path}/${user.id}`);
        res.status(201).send(user);
    } catch (error) {
        return next(error);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const userService = new UserService(req);
        const list = await userService.getUsers();

        res.status(200).send(list);
    } catch (error) {
        return next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const userService = new UserService(req);
        const user = await userService.getUserById();
    
        if (user) {
            res.status(200).send(user);
        } else {     
            res.status(404).send('User with this ID is not exist!');
        }
    } catch (error) {
        return next(error);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const userService = new UserService(req);    
        const user = await userService.updateUserById();

        if (user) {
            res.status(201).send(user);
        } else {
            res.status(404).send('User with this ID is not exist!');
        }
    } catch (error) {
        return next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const userService = new UserService(req);
        const user = await userService.deleteUserById();

        if (user) {
            res.status(204).send();
        } else {
            res.status(404).send('User with this ID is not exist!');
        }
    } catch (error) {
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