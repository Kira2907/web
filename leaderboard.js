const sequelize = require("sequelize");
const { User } = require('../models/Users');
const { expensesData } = require('../models/Users');

exports.getLeaderboard = async (req, res) => {
    try {
      // Retrieve the leaderboard data by joining the expenses and users table
      const leaderboardData = await expensesData.findAll({
        attributes: [
          [sequelize.fn("sum", sequelize.col("amount")), "totalExpenses"],
          "userId"
        ],
        include: [
          {
            model: User,
            attributes: ["name"]
          }
        ],
        group: ["userId"],
        order: [[sequelize.fn("sum", sequelize.col("amount")), "DESC"]]
      });
  
      const leaderboardJson = leaderboardData.map((entry) => {
        const { name } = entry.user;
        const totalExpenses = entry.get("totalExpenses");
        return { name, totalExpenses };
      });
  
      res.status(200).json(leaderboardJson);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to retrieve leaderboard data" });
    }
  };