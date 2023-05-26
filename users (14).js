const Sequelize = require("sequelize");
const sequelize = require('../util/database');

const User = sequelize.define('user', {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  totalExpense: {
    type: Sequelize.INTEGER,
  },
});

const expensesData = sequelize.define("expenses", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
  },
  description: {
    type: Sequelize.STRING(255),
  },
  category: {
    type: Sequelize.STRING(255),
  },
  
});

User.hasMany(expensesData, { foreignKey: 'userId' });
expensesData.belongsTo(User, { foreignKey: 'userId' });

async function syncDatabase() {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
}

syncDatabase();

module.exports = {
  User,
  expensesData,
}; 