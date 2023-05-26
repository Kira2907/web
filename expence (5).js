const sequelize = require("sequelize");
const Model = require("../models/Users");
const expensesData = Model.expensesData;
const User = Model.User;

exports.addExpense = async (req, res) => {
  // Get the form data
  const { amount, description, category, userId } = req.body;

  try {
    // Start a transaction
    const t = await sequelize.transaction();

    try {
      // Create a new expense with the user ID
      const expense = await expensesData.create(
        {
          amount,
          description,
          category,
          userId,
        },
        { transaction: t }
      );

      // Retrieve the current totalExpense value from the User table
      const user = await User.findByPk(userId, { transaction: t });
      let totalExpense = user.totalExpense || 0;

      // Calculate the updated totalExpense value
      totalExpense += amount;

      // Update the totalExpense value in the User table
      await User.update(
        { totalExpense },
        { where: { userId: userId }, transaction: t }
      );

      // Commit the transaction
      await t.commit();

      res.status(201).json(expense);
    } catch (err) {
      // Rollback the transaction if an error occurred
      await t.rollback();
      throw err;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add expense" });
  }
};  

exports.getExpense = async (req, res) => {
  try {
    // Get the user ID from the request header
    const userId = req.query.userId; 
    console.log(userId);   
    // Get all expenses for the user from the database
    const expenses = await expensesData.findAll({where: { userId }});
    
    // Convert the expenses to JSON
    const expensesJson = expenses.map((expense) => expense.toJSON());

    res.status(200).json(expensesJson);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve expenses" });
  }
};

exports.deleteExpense = async (req, res) => {
  const id = req.params.id;
  const userId = req.query.userId;

  try {
    // Start a transaction
    const transaction = await sequelize.transaction();

    try {
      // Find the expense to be deleted within the transaction
      const expense = await expensesData.findOne({ where: { id, userId }, transaction });

      if (!expense) {
        // No expense with the given ID and user ID was found
        return res.status(404).json({ error: "Expense not found" });
      }

      // Get the amount of the expense
      const amount = expense.amount;

      // Delete the expense from the database within the transaction
      await expensesData.destroy({ where: { id, userId }, transaction });

      // Update the totalExpense value in the User table within the transaction
      await User.decrement(
        { totalExpense: amount },
        { where: { userId: userId }, transaction }
      );

      // Commit the transaction
      await transaction.commit();

      res.sendStatus(204);
    } catch (err) {
      // Rollback the transaction if any error occurs
      await transaction.rollback();
      throw err;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
}; 