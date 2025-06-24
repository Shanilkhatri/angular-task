const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite", // this file will store our database, by creating a file at root
});

module.exports = sequelize;
