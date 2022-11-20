const express = require('express');
const { userRouter, groupRouter } = require('../api/routes');
const { serviceMethodLogger, logUnhandledErrors } = require('../api/middlewares');

const databaseLoader = async (app) => {
    app.use(express.json());

    app.use(serviceMethodLogger);    
    app.use(logUnhandledErrors);

    app.use('/users', userRouter);
    app.use('/groups', groupRouter);
}

module.exports = databaseLoader;