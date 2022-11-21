const { GroupService } = require('../services');

const createGroup = async (req, res, next) => {
    try {
        const groupService = new GroupService(req);
        const group = await groupService.createGroup();

        res.setHeader('Location', `${req.path}/${group.id}`);
        res.status(201).send(group);
    } catch (error) {
        return next(error);
    }
}

const addUsersToGroup = async (req, res, next) => {
    try {
        const groupService = new GroupService(req);
        const userGroup = await groupService.addUsersToGroup();

        if (userGroup) {
            res.status(201).send(userGroup);
        } else {     
            res.status(404).send('Group is not exist!');
        }
    } catch (error) {
        return next(error);
    }
}

const getGroups = async (req, res, next) => {
    try {
        const groupService = new GroupService(req);
        const list = await groupService.getGroups();

        res.status(200).send(list);        
    } catch (error) {
        return next(error);
    }
}

const getGroupById = async (req, res, next) => {
    try {
        const groupService = new GroupService(req);
        const group = await groupService.getGroupById();
  
        if (group) {
            res.status(200).send(group);
        } else {     
            res.status(404).send('User with this ID is not exist!');
        }        
    } catch (error) {
        return next(error);
    }
}

const updateGroupById = async (req, res, next) => {
    try {
        const groupService = new GroupService(req);
        const group = await groupService.updateGroupById();

        if (group) {
            res.status(201).send(group);
        } else {
            res.status(404).send('Group with this ID is not exist!');
        }
    } catch (error) {
        return next(error);
    }
}

const deleteGroupById = async (req, res, next) => {
    try {
        const groupService = new GroupService(req);
        const group = await groupService.deleteGroupById();

        if (group) {
            res.status(204).send();
        } else {
            res.status(404).send('Group with this ID is not exist!');
        }
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    createGroup,
    addUsersToGroup,
    getGroups,
    getGroupById,
    updateGroupById,
    deleteGroupById
};