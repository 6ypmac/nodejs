const { GroupService } = require('../services');
const { serviceMethodLogger } = require('../api/middlewares');

const createGroup = async (req, res, next) => {
    try {
        const groupService = new GroupService(req, res, next);
        const group = await groupService.createGroup();

        if (group) {
            res.setHeader('Location', `${req.path}/${group.id}`);
            res.status(201).send(group);
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
}

const addUsersToGroup = async (req, res, next) => {
    try {
        const groupService = new GroupService(req, res, next);
        const userGroup = await groupService.addUsersToGroup();

        if (userGroup) {
            res.status(201).send(userGroup);
        } else {
            const message = 'Entries were not added to the database table.';
            const err = { message };
            res.status(400).send(message);
            serviceMethodLogger(err, req, res, next);
        }
    } catch (error) {
        serviceMethodLogger(error, req, res, next);
        return next(error);
    }
}

const getGroups = async (req, res, next) => {
    try {
        const groupService = new GroupService(req, res, next);
        const list = await groupService.getGroups();

        if (list) {
            res.status(200).send(list);
        } else {
            const message = 'Groups not found.';
            const err = { message };
            res.status(404).send(message);
            serviceMethodLogger(err, req, res, next);
        }        
    } catch (error) {
        serviceMethodLogger(error, req, res, next);
        return next(error);
    }
}

const getGroupById = async (req, res, next) => {
    try {
        const groupService = new GroupService(req, res, next);
        const group = await groupService.getGroupById();

        if (group) {
            res.status(200).send(group);
        } else {
            const message = 'Group with this ID is not exist.';
            const err = { message };
            res.status(404).send(message);
            serviceMethodLogger(err, req, res, next);
        }
    } catch (error) {
        serviceMethodLogger(error, req, res, next);
        return next(error);
    }
}

const updateGroupById = async (req, res, next) => {
    try {
        const groupService = new GroupService(req, res, next);
        const group = await groupService.updateGroupById();

        if (group) {
            res.status(202).send(group);
        } else {
            const message = 'Group with this ID is not exist.';
            const err = { message };
            res.status(404).send(message);
            serviceMethodLogger(err, req, res, next);
        }
    } catch (error) {
        serviceMethodLogger(error, req, res, next);
        return next(error);
    }
}

const deleteGroupById = async (req, res, next) => {
    try {
        const groupService = new GroupService(req, res, next);
        const group = await groupService.deleteGroupById();

        if (group) {
            res.status(204).send('Group was deleted');
        } else {
            const message = 'Group with this ID is not exist.';
            const err = { message };
            res.status(404).send(message);
            serviceMethodLogger(err, req, res, next);
        }
    } catch (error) {
        serviceMethodLogger(error, req, res, next);
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