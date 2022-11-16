const { randomUUID } = require('crypto');
const { generatePassword } = require('../utils');

// JSON data array
const users = [
    {
        id: randomUUID(),
        login: 'James',
        password: generatePassword(),
        age: 19,
        isDeleted: false
    },
    {
        id: randomUUID(),
        login: 'Patricia',
        password: generatePassword(),
        age: 28,
        isDeleted: false
    },
    {
        id: randomUUID(),
        login: 'Robert',
        password: generatePassword(),
        age: 18,
        isDeleted: false
    },
    {
        id: randomUUID(),
        login: 'Mary',
        password: generatePassword(),
        age: 33,
        isDeleted: false
    },
    {
        id: randomUUID(),
        login: 'John',
        password: generatePassword(),
        age: 48,
        isDeleted: false
    },
    {
        id: randomUUID(),
        login: 'User' + randomUUID().split('-')[0],
        password: generatePassword(),
        age: 25,
        isDeleted: false
    },
    {
        id: randomUUID(),
        login: 'User' + randomUUID().split('-')[0],
        password: generatePassword(),
        age: 56,
        isDeleted: false
    },
    {
        id: randomUUID(),
        login: 'User' + randomUUID().split('-')[0],
        password: generatePassword(),
        age: 29,
        isDeleted: false
    },
    {
        id: randomUUID(),
        login: 'User' + randomUUID().split('-')[0],
        password: generatePassword(),
        age: 66,
        isDeleted: false
    },
    {
        id: randomUUID(),
        login: 'User' + randomUUID().split('-')[0],
        password: generatePassword(),
        age: 80,
        isDeleted: false
    }
];

module.exports = users;
