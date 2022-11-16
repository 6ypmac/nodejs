const express = require('express');
const userLoader = require('./loaders');

async function createExpressApp() {
    const app = express();

    userLoader(app);

    // listen for requests
    app.listen(3000, () => {
        console.log(`Server is ready and listening on port 3000`);
    });
}

createExpressApp();