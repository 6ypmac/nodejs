const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/env.constants');

const jwtToken = (req, res, next) => {
    if (req.path === '/login') {
        return next();
    }
    
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    jwt.verify(token, jwtSecret, (err) => {
        if (err) {
            res.status(403).send(err.message);
        } else {
            next();
        }
    });
}

module.exports = jwtToken;