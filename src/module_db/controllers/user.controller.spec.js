const request = require('supertest');
const app = require('../loaders/express.app');
const { UserService } = require('../services');

const mockUsers = [
    {
        id: "a49594e5-dfec-46e6-84f2-979f8b8a7b37",
        login: "Userec6b09ee",
        password: "k178FLbPl3Y8",
        age: 29,
        isDeleted: false
    },
    {
        id: "3cd83e1b-becd-4ed4-8a9b-70d2a80243bc",
        login: "User4a4d24b3",
        password: "xCgjar2R007U",
        age: 56,
        isDeleted: false
    },
    {
        id: "c1ae2cc2-238f-4d3a-b821-ad52cd453145",
        login: "John",
        password: "Wnb20vSOr7nG",
        age: 48,
        isDeleted: false
    },
    {
        id: "39c2058a-951f-4642-af31-1a7b5ca88ee6",
        login: "User35869",
        password: "asdasdsadRTY6464",
        age: 75,
        isDeleted: false
    },
    {
        id: "3faf376b-ab6d-4291-9f79-b4875b951e41",
        login: "Patricia",
        password: "KXRaezLL58uR",
        age: 28,
        isDeleted: true
    }
];

describe("Check \'UserController\' ", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('[POST] for /users', () => {
        let userData;

        beforeEach(() => {
            const { login, password, age } = mockUsers[0];
            userData = { login, password, age };
        });

        it('should return status 201 and new user', async () => {
            const createUserSpy  = jest.spyOn(UserService.prototype, 'createUser').mockResolvedValueOnce(mockUsers[0]);
            const result = await request(app)
                .post('/users')
                .send(userData);
    
            expect(createUserSpy).toHaveBeenCalled();
            expect(result.status).toBe(201);
            expect(result.body).toEqual(mockUsers[0]);
            expect(result.header?.location).toEqual(`/users/${mockUsers[0].id}`);
        });

        it('should return status 422 error if user cannot be created', async () => {        
            const createUserSpy = jest.spyOn(UserService.prototype, 'createUser')
                .mockImplementation(() => {
                    throw new Error('Unprocessable Entity');
                });
            const result = await request(app).post('/users');

            expect(createUserSpy).toHaveBeenCalledTimes(0);
            expect(result.status).toBe(422);
        });
    });

    describe('[GET] for /users and /users with query parameters (loginSubstring and limit)', () => {
        it('should return status 200 and all users list for /users', async () => {        
            const getUsersSpy = jest.spyOn(UserService.prototype, 'getUsers').mockResolvedValueOnce(mockUsers);
            const result = await request(app).get('/users');
    
            expect(getUsersSpy).toHaveBeenCalled();
            expect(result.status).toBe(200);
            expect(result.body).toEqual(mockUsers);
        });

        it('should return status 200 and users list for /users with query parameter', async () => {
            const loginSubstring = 'User';
            const limit = '3';

            const getUsersSpy = jest.spyOn(UserService.prototype, 'getUsers').mockResolvedValueOnce(mockUsers);
            const result = await request(app).get(`/users?loginSubstring=${loginSubstring}&limit=${limit}`);
    
            expect(getUsersSpy).toHaveBeenCalled();
            expect(result.status).toBe(200);
            expect(result.body).toEqual(mockUsers);
        });

        it('should return status 404 error if any users not found', async () => {        
            const getUsersSpy = jest.spyOn(UserService.prototype, 'getUsers')
                .mockImplementation(() => {
                    throw new Error('Users not found');
                });
            const result = await request(app).get('/users');

            expect(getUsersSpy).toHaveBeenCalled();
            expect(result.status).toBe(404);
        });
    });

    describe('[GET] for /users/:id', () => {
        it('should return status 200 and user by id', async () => {
            const getUserByIdSpy = jest.spyOn(UserService.prototype, 'getUserById').mockResolvedValueOnce(mockUsers[0]);
            const result = await request(app).get('/users/a49594e5-dfec-46e6-84f2-979f8b8a7b37');
    
            expect(getUserByIdSpy).toHaveBeenCalled();
            expect(result.status).toBe(200);
            expect(result.body).toEqual(mockUsers[0]);
        });

        it('should return status 404 error if any user not found', async () => {        
            const getUserByIdSpy = jest.spyOn(UserService.prototype, 'getUserById')
                .mockImplementation(() => {
                    throw new Error('Users not found');
                });
            const result = await request(app).get('/users/a49594e5-dfec-46e6-84f2-979f8b8a7b37');

            expect(getUserByIdSpy).toHaveBeenCalled();
            expect(result.status).toBe(404);
        });
    });

    describe('[PUT] for /users/:id', () => {
        let userData;

        beforeEach(() => {
            const { login, password, age } = mockUsers[0];
            userData = { login, password, age };
        });

        it('should return status 202 andcupdate user by id', async () => {
            const updateUserByIdSpy = jest.spyOn(UserService.prototype, 'updateUserById').mockResolvedValueOnce(mockUsers[0]);
            const result = await request(app)
                .put('/users/a49594e5-dfec-46e6-84f2-979f8b8a7b37')
                .send(userData);
    
            expect(updateUserByIdSpy).toHaveBeenCalled(); 
            expect(result.status).toBe(202);
            expect(result.body).toEqual(mockUsers[0]);
        });

        it('should return status 422 error if any user not updated', async () => {        
            const updateUserByIdSpy = jest.spyOn(UserService.prototype, 'updateUserById')
                .mockImplementation(undefined);
            const result = await request(app).put('/users/a49594e5-dfec-46e6-84f2-979f8b8a7b37');

            expect(updateUserByIdSpy).toHaveBeenCalledTimes(0);
            expect(result.status).toBe(422);
        });
    });

    describe('[DELETE] for /users/:id', () => {
        it('should return status 204 if successful', async () => {
            const deleteUserByIdSpy = jest.spyOn(UserService.prototype, 'deleteUserById').mockResolvedValueOnce(mockUsers[0]);
            const result = await request(app).delete('/users/a49594e5-dfec-46e6-84f2-979f8b8a7b37');
    
            expect(deleteUserByIdSpy).toHaveBeenCalled();
            expect(result.status).toBe(204);
        });

        it('should return status 404 error if user not deleted', async () => {        
            const deleteUserByIdSpy = jest.spyOn(UserService.prototype, 'deleteUserById')
                .mockImplementation(undefined);
            const result = await request(app).get('/users/a49594e5-dfec-46e6-84f2-979f8b8a7b37');

            expect(deleteUserByIdSpy).toHaveBeenCalledTimes(0);
            expect(result.status).toBe(404);
        });
    });
});