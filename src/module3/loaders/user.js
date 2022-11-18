const bodyParser = require('body-parser');
const { userRouter } = require('../api/routes');

const userLoader = async (app) => {
    app.use(bodyParser.json());
    app.use('/users', userRouter);
}

module.exports = userLoader;