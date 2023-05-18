const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Kira@297', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports =sequelize;  