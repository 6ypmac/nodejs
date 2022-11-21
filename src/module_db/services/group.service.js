const { User, Group, UserGroup } = require('../models');
const { sequelize } = require('../config');
const { randomUUID } = require('crypto');
const logger = require('../api/middlewares/loggers');
const { serviceMethodLogger } = require('../api/middlewares');

class GroupService {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    createGroup() {
        const { name, permissions } = this.req.body;
        const id = randomUUID();        

        try {
            return Group.create({ id, name, permissions });
        } catch (error) {
            serviceMethodLogger(error, this.req, this.res, this.next);
        }
    }

    getGroups() {        
        try {
            return Group.findAll();
        } catch (error) {
            serviceMethodLogger(error, this.req, this.res, this.next);
        }
    }

    async getGroupById() {
        const id = this.req.params.id;

        try {
            const group = await Group.findByPk(id);
        
            return group;            
        } catch (error) {
            serviceMethodLogger(error, this.req, this.res, this.next);
        }
    }

    async updateGroupById() {
        const { name, permissions } = this.req.body;
        const id = this.req.params.id;

        try {
            const group = await Group.findByPk(id);
        
            group.name = name;
            group.permissions = permissions;
        
            await group.save();
        
            return group;
        } catch (error) {
            serviceMethodLogger(error, this.req, this.res, this.next);
        }        
    }

    async deleteGroupById() {
        const id = this.req.params.id;
        const transaction = await sequelize.transaction();

        try {
            const group = await Group.destroy({
                where: {
                    id
                }
            });

            await UserGroup.destroy({
                where: {
                    groupId: id
                }
            });

            await transaction.commit();
    
            return group;            
        } catch(error) {
            await transaction.rollback();
            serviceMethodLogger(error, this.req, this.res, this.next);
        }
    }

    async addUsersToGroup() {        
        const { userIds } = this.req.body;
        const groupId = this.req.params.id;

        const transaction = await sequelize.transaction();        

        try {
            const group = await Group.findByPk(groupId, { transaction });
            const users = await User.findAll({
                where: {
                    id: userIds,
                    isDeleted: false
                },
                transaction
            });

            const userGroup = await UserGroup.bulkCreate(
                users.map((user) => {
                    const id = randomUUID();

                    return {
                        id,
                        userId: user.id,
                        groupId: group.id,
                    };
                }), {
                    transaction
                });
      
            await transaction.commit();

            return userGroup;
        } catch (error) {
            await transaction.rollback();
            serviceMethodLogger(error, this.req, this.res, this.next);
        }
    }
}

module.exports = GroupService;