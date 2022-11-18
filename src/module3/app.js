const express = require('express');
const userLoader = require('./loaders');
const { config } = require('./config');

async function createExpressApp() {
    const app = express();
    const appPort = config.app.port;

    userLoader(app);

    // listen for requests
    app.listen(appPort, () => {
        console.log(`Server is ready and listening on port ${appPort}`);
    });
}

createExpressApp();