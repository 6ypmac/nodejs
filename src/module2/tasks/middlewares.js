const users = require('./users');

function getAutoSuggestUsers(req, res) {
    const {
        loginSubstring = 'User',
        limit = '3'
    } = req.query;

    const list = users
        .filter(user => user.login.includes(loginSubstring))
        .sort((a, b) => a.login.localeCompare(b.login))
        .slice(0, parseInt(limit));

    res.status(200).json(list);
}

module.exports = {
    getAutoSuggestUsers
}