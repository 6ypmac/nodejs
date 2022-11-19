const { User, Group, UserGroup } = require('../models');
const { sequelize } = require('../config');
const { randomUUID } = require('crypto');

class GroupService {
    constructor(request) {
        this.regBody = request.body;
        this.reqQuery = request.query;
        this.reqParams = request.params;
    }

    createGroup() {
        const { name, permissions } = this.regBody;
        const id = randomUUID();
        const isDeleted = false;
        
        return Group.create({ id, name, permissions });
    }

    getGroups() {
        return Group.findAll();
    }

    getGroupById() {
        const id = this.reqParams.id;

        return Group.findByPk(id);
    }

    async updateGroupById() {
        const { name, permissions } = this.regBody;
        const id = this.reqParams.id;

        const group = await Group.findByPk(id);
        
        group.name = name;
        group.permissions = permissions;
    
        await group.save();
    
        return group; 
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
            console.log(error);
            await transaction.rollback();
        }
    }

    async addUsersToGroup() {        
        const { userIds } = this.regBody;
        const groupId = this.reqParams.id;

        const transaction = await sequelize.transaction();
        const group = await Group.findByPk(groupId, { transaction });
        // console.log("group: " + JSON.stringify(group, null, 4));

        if (!group) {
            return;
        }

        try {
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
            console.log(error);
            await transaction.rollback();
        }
    }
}

module.exports = GroupService;