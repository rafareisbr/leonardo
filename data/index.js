const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("leonardo", "postgres", "test", {
  host: "localhost",
  dialect: "postgres"
});

module.exports = sequelize;
