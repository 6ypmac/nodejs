const express = require('express');
const router = express.Router();
const users = require('../../models');
const { getAutoSuggestUsers, userValidator }  = require('../middlewares');
const { UserService } = require('../../services');

// READ
// this api end-point of an API returns JSON users array
router.get('/', getAutoSuggestUsers, function (req, res) {
    return res.status(200).json(users);
});

// READ
// this api end-point returns an object from a users array find by id
// we get `id` from URL end-points 
router.get('/:id', function (req, res) {
    const userService = new UserService(req, users);
    const found = userService.getUserById();

    if (found) {
        return res.status(200).json(found);
    } else {
        return res.sendStatus(404);
    }
});

// CREATE
// this api end-point add new object to user list
// that is add new object to `users` array
router.post('/', userValidator, function (req, res) {
    const userService = new UserService(req, users);
    const newUser = userService.createUser();

    users.push(newUser);

    return res.status(201).json(newUser);
});

// UPDATE
// this api end-point update an existing user object
// for that we get `id` from api end-point of user to update
router.put('/:id', userValidator, function (req, res) {
    const userService = new UserService(req, users);
    const updatedResult = userService.updateUserById();    

    if (updatedResult) {
        const { table, item } = updatedResult;

        users = table;

        return res.json(item);
    } else {
        return res.sendStatus(404);
    }
});

// DELETE
// this api end-point delete an existing user object from
// array of users, match by `id` find user and then delete
router.delete('/:id', function (req, res) {
    const userService = new UserService(req, users);
    const deletedResult = userService.deleteUserById();    

    if (deletedResult) {
        const { table, item } = deletedResult;

        users = table;

        return res.json(item);
    } else {
        return res.sendStatus(404);
    }
});

module.exports = router;