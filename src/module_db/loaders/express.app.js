const express = require('express');
const cors = require('cors');
const { userRouter, groupRouter, authRouter } = require('../api/routes');
const { serviceMethodLogger, logUnhandledErrors, jwtToken } = require('../api/middlewares');

const app = express();

app.use(cors());
app.use(express.json());

app.use(serviceMethodLogger);
app.use(logUnhandledErrors);
//app.use(jwtToken);

//app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/groups', groupRouter);

module.exports = app;