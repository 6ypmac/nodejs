const express = require('express');
const router = express.Router();
const { groupValidator, userGroupValidator }  = require('../middlewares');
const { GroupController } = require('../../controllers');

const {
    createGroup,
    addUsersToGroup,
    getGroups,
    getGroupById,
    updateGroupById,
    deleteGroupById
} = GroupController;

router.post('/', groupValidator, createGroup);

router.post('/:id/userIds', userGroupValidator, addUsersToGroup);

router.get('/', getGroups);

router.get('/:id', getGroupById);

router.put('/:id', groupValidator, updateGroupById);

router.delete('/:id', deleteGroupById);

module.exports = router;