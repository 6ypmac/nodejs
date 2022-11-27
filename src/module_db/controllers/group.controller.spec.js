const request = require('supertest');
const app = require('../loaders/express.app');
const { GroupService } = require('../services');

const mockGroups = [
    {
        id: "09625bc9-fe4d-41c8-9762-86a855e7e47d",
        name: "Guest",
        permissions: [
            "READ"
        ]
    },
    {
        id: "89aaf353-26d2-400a-81cf-4e7e73f8b8e8",
        name: "Group",
        permissions: [
            "READ",
            "WRITE"
        ]
    },
    {
        id: "7cb9d26d-0413-4b6f-8a6b-8af9d737850b",
        name: "Admin",
        permissions: [
            "READ",
            "WRITE",
            "DELETE",
            "SHARE",
            "UPLOAD_FILES"
        ]
    }
];

const mockUserGroups = [
    {
        id: "211832fd-2717-4926-a803-c779005f3882",
        userId: "3faf376b-ab6d-4291-9f79-b4875b951e41",
        groupId: "09625bc9-fe4d-41c8-9762-86a855e7e47d"
    },
    {
        id: "8b71e6aa-15d2-40eb-8787-d760a1ead097",
        userId: "39c2058a-951f-4642-af31-1a7b5ca88ee",
        groupId: "09625bc9-fe4d-41c8-9762-86a855e7e47d"
    }
]

describe("Check \'GroupController\' ", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('[POST] for /groups', () => {
        let groupData;

        beforeEach(() => {
            const { name, permissions } = mockGroups[0];
            groupData = { name, permissions };
        });

        it('should return status 201 and new group', async () => {
            const createGroupSpy  = jest.spyOn(GroupService.prototype, 'createGroup').mockResolvedValueOnce(mockGroups[0]);
            const result = await request(app)
                .post('/groups')
                .send(groupData);
    
            expect(createGroupSpy).toHaveBeenCalled();
            expect(result.status).toBe(201);

            expect(result.body).toEqual(mockGroups[0]);
            expect(result.header?.location).toEqual(`/groups/${mockGroups[0].id}`);
        });

        it('should return status 422 error if group cannot be created', async () => {        
            const createGroupSpy = jest.spyOn(GroupService.prototype, 'createGroup')
                .mockImplementation(() => {
                    throw new Error('Unprocessable Entity');
                });
            const result = await request(app).post('/groups');

            expect(createGroupSpy).toHaveBeenCalledTimes(0);
            expect(result.status).toBe(422);
        });
    });

    describe('[GET] for /groups', () => {
        it('should return status 200 and all groups list for /groups', async () => {        
            const getGrousSpy = jest.spyOn(GroupService.prototype, 'getGroups').mockResolvedValueOnce(mockGroups);
            const result = await request(app).get('/groups');
    
            expect(getGrousSpy).toHaveBeenCalled();
            expect(result.status).toBe(200);
            expect(result.body).toEqual(mockGroups);
        });

        it('should return status 404 error if any groups not found', async () => {        
            const getGrousSpy = jest.spyOn(GroupService.prototype, 'getGroups')
                .mockImplementation(() => {
                    throw new Error('groups not found');
                });
            const result = await request(app).get('/groups');

            expect(getGrousSpy).toHaveBeenCalled();
            expect(result.status).toBe(404);
        });
    });

    describe('[GET] for /groups/:id', () => {
        it('should return status 200 and group by id', async () => {
            const getGroupByIdSpy = jest.spyOn(GroupService.prototype, 'getGroupById').mockResolvedValueOnce(mockGroups[0]);
            const result = await request(app).get('/groups/09625bc9-fe4d-41c8-9762-86a855e7e47d');
    
            expect(getGroupByIdSpy).toHaveBeenCalled();
            expect(result.status).toBe(200);
            expect(result.body).toEqual(mockGroups[0]);
        });

        it('should return status 404 error if any group not found', async () => {        
            const getGroupByIdSpy = jest.spyOn(GroupService.prototype, 'getGroupById')
                .mockImplementation(() => {
                    throw new Error('groups not found');
                });
            const result = await request(app).get('/groups/09625bc9-fe4d-41c8-9762-86a855e7e47d');

            expect(getGroupByIdSpy).toHaveBeenCalled();
            expect(result.status).toBe(404);
        });
    });

    describe('[PUT] for /groups/:id', () => {
        let groupData;
    
        beforeEach(() => {
            const { name, permissions } = mockGroups[0];
            groupData = { name, permissions };
        });
    
        it('should return status 202 andcupdate group by id', async () => {
            const updateGroupByIdSpy = jest.spyOn(GroupService.prototype, 'updateGroupById').mockResolvedValueOnce(mockGroups[0]);
            const result = await request(app)
                .put('/groups/09625bc9-fe4d-41c8-9762-86a855e7e47d')
                .send(groupData);
    
            expect(updateGroupByIdSpy).toHaveBeenCalled(); 
            expect(result.status).toBe(202);
            expect(result.body).toEqual(mockGroups[0]);
        });
    
        it('should return status 422 error if any group not updated', async () => {        
            const updateGroupByIdSpy = jest.spyOn(GroupService.prototype, 'updateGroupById')
                .mockImplementation(undefined);
            const result = await request(app).put('/groups/09625bc9-fe4d-41c8-9762-86a855e7e47d');
    
            expect(updateGroupByIdSpy).toHaveBeenCalledTimes(0);
            expect(result.status).toBe(422);
        });
    });

    describe('[DELETE] for /groups/:id', () => {
        it('should return status 204 if successful', async () => {
            const deleteGroupByIdSpy = jest.spyOn(GroupService.prototype, 'deleteGroupById').mockResolvedValueOnce(mockGroups[0]);
            const result = await request(app).delete('/groups/09625bc9-fe4d-41c8-9762-86a855e7e47d');
    
            expect(deleteGroupByIdSpy).toHaveBeenCalled();
            expect(result.status).toBe(204);
        });

        it('should return status 404 error if group not deleted', async () => {        
            const deleteGroupByIdSpy = jest.spyOn(GroupService.prototype, 'deleteGroupById')
                .mockImplementation(undefined);
            const result = await request(app).get('/groups/09625bc9-fe4d-41c8-9762-86a855e7e47d');

            expect(deleteGroupByIdSpy).toHaveBeenCalledTimes(0);
            expect(result.status).toBe(404);
        });
    });

    describe('[POST] /groups/:id/addUsers', () => {
        const usersData = {
            userIds: [
                '3faf376b-ab6d-4291-9f79-b4875b951e41',
                '39c2058a-951f-4642-af31-1a7b5ca88ee'
            ]
        };

        it('should return status 201 if successful', async () => {
            const addUsersToGroupSpy = jest.spyOn(GroupService.prototype, 'addUsersToGroup').mockResolvedValueOnce(mockUserGroups);
            const result = await request(app)
                .post('/groups/09625bc9-fe4d-41c8-9762-86a855e7e47d/userIds')
                .send(usersData);
      
            expect(addUsersToGroupSpy).toHaveBeenCalled();
            expect(result.status).toBe(201);
        });

        it('should return status 400 error if any user group not updated', async () => {        
            const addUsersToGroupSpy = jest.spyOn(GroupService.prototype, 'addUsersToGroup')
                .mockImplementation(undefined);
            const result = await request(app)
                .post('/groups/09625bc9-fe4d-41c8-9762-86a855e7e47d/userIds')
                .send(usersData);
    
            expect(addUsersToGroupSpy).toHaveBeenCalled();
            expect(result.status).toBe(400);
        });
    });
});