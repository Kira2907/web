const Model = require("../models/Users");
const expensesData = Model.expensesData;

exports.addExpense = async (req, res) => {
  // Get the form data
  const { amount, description, category, userId } = req.body;

  // Get the user ID from the request header
 // const userId = req.headers.userId;
  
  try {
    // Create a new expense with the user ID
    const expense = await expensesData.create({
      amount,
      description,
      category,
      userId,
    });

    res.status(201).json(expense);
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
  try {
    const id = req.params.id;

    // Get the user ID from the request header
    const userId = req.query.userId;
    
    // Delete the expense from the database
    await expensesData.destroy({ where: { id, userId } });

    res.status(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
}; 