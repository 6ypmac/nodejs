const express = require('express');
const router = express.Router();
const users = require('./users');
const { randomUUID } = require('crypto');
const { getAutoSuggestUsers } = require('./middlewares');
const Joi = require('joi');

// Joi validation
const userValidationSchema = Joi.object({
    login: Joi.string().alphanum().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    age: Joi.number().min(1).max(150).required(),
});

const userValidator = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(422).json({
            status: 'error',
            message: 'Invalid request data'
        });
    } else {
        next();
    }
};

// READ
// this api end-point of returns Auto Suggest Users
router.get('/', getAutoSuggestUsers);

// READ
// this api end-point of an API returns JSON users array
router.get('/', function (req, res) {
    res.status(200).json(users);
});

// READ
// this api end-point returns an object from a users array find by id
// we get `id` from URL end-points 
router.get('/:id', function (req, res) {
    // find an object from `users` array match by `id`
    const found = users.find(user => user.id === req.params.id);
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// CREATE
// this api end-point add new object to user list
// that is add new object to `users` array
router.post('/', userValidator(userValidationSchema), function (req, res) {
    // create new id
    const newId = randomUUID();

    // create an object of new User
    let newUser = {
        id: newId,
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: false
    };

    // push new user object to users array
    users.push(newUser);

    // return with status 201 (Created) 
    res.status(201).json(newUser);
});

// UPDATE
// this api end-point update an existing user object
// for that we get `id` from api end-point of user to update
router.put('/:id', userValidator(userValidationSchema), function (req, res) {
    // get user object match by `id`
    const found = users.find(user => user.id === req.params.id);

    // check if user found
    if (found) {
        const updated = {
            id: found.id,
            login: req.body.login,
            password: req.body.password,
            age: req.body.age,
            isDeleted: found.isDeleted
        };

        // find index of found object from array of users
        const targetIndex = users.indexOf(found);

        // replace object from users list with `updated` object
        users.splice(targetIndex, 1, updated);

        // return with status 204 (success status)
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// DELETE
// this api end-point delete an existing user object from
// array of users, match by `id` find user and then delete
router.delete('/:id', function (req, res) {
    // find user from array of users
    const found = users.find(user => user.id === req.params.id && !user.isDeleted);

    if (found) {
        // if user found then find index at which the item is
        // stored in the `users` array
        let targetIndex = users.indexOf(found);

        // soft delete user        
        found.isDeleted = true;
        users.splice(targetIndex, 1, found);

        // return with status 204 (success status)
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }    
});

module.exports = router;