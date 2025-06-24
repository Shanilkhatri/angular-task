const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // can't leave name empty
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // each email must be different
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = User;
