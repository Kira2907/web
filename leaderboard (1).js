const sequelize = require("sequelize");
const { User } = require('../models/Users');

exports.getLeaderboard = async (req, res) => {
  try {
    // Retrieve the leaderboard data from the User table
    const leaderboardData = await User.findAll({
      attributes: ["name", "totalExpense"],
      order: [["totalExpense", "DESC"]]
    });
    
    res.status(200).json(leaderboardData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve leaderboard data" });
  }
}; 

