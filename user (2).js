const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Product = sequelize.define("products", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      default: 1,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
    },
    name: {
      type: Sequelize.STRING(255),
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.TIME,
    },
  });

    module.exports = Product;