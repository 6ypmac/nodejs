const { User, Group, UserGroup } = require('../models');
const { sequelize } = require('../config');
const { randomUUID } = require('crypto');
const errorLogger = require('../api/middlewares/loggers/error.logger');

class GroupService {
    constructor(request) {
        this.reqBody = request.body;
        this.reqQuery = request.query;
        this.reqParams = request.params;
    }

    createGroup() {
        const { name, permissions } = this.reqBody;
        const id = randomUUID();

        try {
            return Group.create({ id, name, permissions });
        } catch (error) {
            const message = `${error.stack}`;
            errorLogger.error(message);
        }
    }

    getGroups() {        
        try {
            return Group.findAll();
        } catch (error) {
            const message = `${error.stack}`;
            errorLogger.error(message);
        }
    }

    async getGroupById() {
        const id = this.reqParams.id;

        try {
            const group = await Group.findByPk(id);
        
            return group;            
        } catch (error) {
            const message = `${error.stack}`;
            errorLogger.error(message);
        }
    }

    async updateGroupById() {
        const { name, permissions } = this.reqBody;
        const id = this.reqParams.id;

        try {
            const group = await Group.findByPk(id);
        
            group.name = name;
            group.permissions = permissions;
        
            await group.save();
        
            return group;
        } catch (error) {
            const message = `${error.stack}`;
            errorLogger.error(message);
        }        
    }

    async deleteGroupById() {
        const id = this.reqParams.id;
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
            const message = `${error.stack}`;
            errorLogger.error(message);
        }
    }

    async addUsersToGroup() {        
        const { userIds } = this.reqBody;
        const groupId = this.reqParams.id;

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
            const message = `${error.stack}`;
            errorLogger.error(message);
        }
    }
}

module.exports = GroupService;