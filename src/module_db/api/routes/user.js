const express = require('express');
const router = express.Router({mergeParams: true});
const { userValidator }  = require('../middlewares');
const { UserService } = require('../../services');

router.post('/', userValidator, async (req, res) => {
    const userService = new UserService(req);  
    const user = await userService.createUser();
    
    res.status(201).send(user);
});

router.get('/', async function (req, res) {
    const userService = new UserService(req);
    const list = await userService.getUsers();

    res.status(200).send(list);
});

router.get('/:id', async (req, res) => {    
    const userService = new UserService(req);
    const user = await userService.getUserById();
  
    if (user) {
        res.status(200).send(user);
    } else {     
        res.status(404).send('User with this ID is not exist!');
    }
});

router.put('/:id', userValidator, async (req, res) => {
    const userService = new UserService(req);    
    const user = await userService.updateUserById();

    if (user) {
        res.status(201).send(user);
    } else {
        res.status(404).send('User with this ID is not exist!');
    }
});

router.delete('/:id', async (req, res) => {
    const userService = new UserService(req);
    const user = await userService.deleteUserById();

    if (user) {
        res.status(204).send();
    } else {
        res.status(404).send('User with this ID is not exist!');
    }
});

module.exports = router;