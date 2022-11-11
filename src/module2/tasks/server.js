const express = require('express');
const bodyParser = require('body-parser');

const users = require('./users');
const userRouters = require('./user.routers');

// create express app
const app = express();
app.use(bodyParser.json());

// user routers
app.use('/users', userRouters);

// default URL to API
app.get('/', (req, res) => {
    res.json(users);
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

