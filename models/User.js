const Sequelize = require("sequelize");
const db = require('../database/db');

const User = db.define('users', {
    username: {
        type: Sequelize.STRING(100),
        unique: true
    },
    password: Sequelize.STRING(100),
});

//创建表
User.sync({
    force: false
});

module.exports = User;