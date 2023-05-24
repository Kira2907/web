const Model = require("../models/Users");
const expensesData = Model.expensesData;

exports.addExpense =  async (req, res) => {
 
    // Get the form data
    const { amount, description, category } = req.body;
  
    // Create a new expense
    const expense = expensesData.build({
      amount,
      description,
      category,
    });
  
    // Save the expense to the database
    await expense.save();
  
  };

exports.getExpense = async (req, res) => {
    // Get all expenses from the database
    const expenses = await expensesData.findAll();
  
    // Convert the expenses to JSON
    const expensesJson = expenses.map(expense => expense.toJSON());
  
    // Send the expenses back to the client
    res.json(expensesJson);
  };
  
exports.deleteExpense =  async (req, res) => {
    // Get the expense ID from the request
    const id = req.params.id;
  
    // Delete the expense from the database
    await expensesData.destroy({ where: { id } });
  
  };