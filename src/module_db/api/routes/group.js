const express = require('express');
const router = express.Router();
const { groupValidator, userGroupValidator }  = require('../middlewares');
const { GroupService } = require('../../services');

router.post('/', groupValidator, async (req, res) => {
    const groupService = new GroupService(req);
    const group = await groupService.createGroup();

    res.status(201).send(group);
});

router.post('/:id/userIds', userGroupValidator, async (req, res) => {
    const groupService = new GroupService(req);
    const userGroup = await groupService.addUsersToGroup();

    if (userGroup) {
        res.status(201).send(userGroup);
    } else {     
        res.status(404).send('Group is not exist!');
    }
});

router.get('/', async (req, res) => {    
    const groupService = new GroupService(req);
    const list = await groupService.getGroups();

    res.status(200).send(list);
});

router.get('/:id', async (req, res) => {
    const groupService = new GroupService(req);
    const group = await groupService.getGroupById();
  
    if (group) {
        res.status(200).send(group);
    } else {     
        res.status(404).send('User with this ID is not exist!');
    }
});

router.put('/:id', groupValidator, async (req, res) => {
    const groupService = new GroupService(req);
    const group = await groupService.updateGroupById();

    if (group) {
        res.status(201).send(group);
    } else {
        res.status(404).send('Group with this ID is not exist!');
    }
});

router.delete('/:id', async (req, res) => {
    const groupService = new GroupService(req);
    const group = await groupService.deleteGroupById();

    if (group) {
        res.status(204).send();
    } else {
        res.status(404).send('Group with this ID is not exist!');
    }
});

module.exports = router;