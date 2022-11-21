const express = require('express');
const router = express.Router({mergeParams: true});
const { userValidator }  = require('../middlewares');
const { UserController } = require('../../controllers');

const {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
} = UserController;

router.post('/', userValidator, createUser);

router.get('/', getUsers);

router.get('/:id', getUserById);

router.put('/:id', userValidator, updateUserById);

router.delete('/:id', deleteUserById);

module.exports = router;