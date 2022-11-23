const express = require('express');
const router = express.Router();
const { loginValidator }  = require('../middlewares');
const { AuthController } = require('../../controllers');

const { getJwtToken } = AuthController;

router.post('/login', loginValidator, getJwtToken);

module.exports = router;