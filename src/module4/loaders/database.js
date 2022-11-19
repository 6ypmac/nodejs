const express = require('express');
const { userRouter, groupRouter } = require('../api/routes');

const databaseLoader = async (app) => {
    app.use(express.json());
    app.use('/users', userRouter);
    app.use('/groups', groupRouter);
}

module.exports = databaseLoader;