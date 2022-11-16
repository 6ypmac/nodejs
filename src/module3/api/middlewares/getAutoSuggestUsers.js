const users = require('../../models/users.data');
const { isEmptyObject } = require('../../utils');

const getAutoSuggestUsers = (req, res, next) => {
    if (!isEmptyObject(req.query)) {
        const {
            loginSubstring = 'User',
            limit = '3'
        } = req.query;
    
        const list = users
            .filter(user => user.login.includes(loginSubstring))
            .sort((a, b) => a.login.localeCompare(b.login))
            .slice(0, parseInt(limit));
    
        res.status(200).json(list);
    } else {
        next();
    }   
}

module.exports = getAutoSuggestUsers;