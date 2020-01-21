const Sequelize = require("sequelize");

const sequelize = require("../data");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cpf: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true
  },
  nome: {
    type: Sequelize.STRING
  },
  dataNascimento: Sequelize.DATE,
  sexo: Sequelize.STRING(1),
  telefone: Sequelize.STRING(25)
});

module.exports = User;
