const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.login = function(req, res) {
  const email = req.body.email;
  const senha = req.body.senha;
  let loadedUser;

  User.findOne({ where: { email: email } })
    .then(user => {
      if (user === null) {
        return res.status(404).json({ message: "Não rolou" });
      }
      loadedUser = user;
      return bcrypt.compare(senha, user.senha);
    })
    .then(senhaValida => {
      if (!senhaValida) {
        return res.status(400).json({ message: "Credenciais inválidas" });
      }
      const token = jwt.sign(
        { userId: loadedUser.id, email: loadedUser.email },
        "secret",
        {
          expiresIn: "24h"
        }
      );
      res.json({ token: token, userId: loadedUser.id });
    })
    .catch(err => {
      console.log(err);
      if (!err.statusCode) {
        res.status(500).json(err);
      }
    });
};

exports.register = function(req, res) {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  const cpf = req.body.cpf;
  const sexo = req.body.sexo;
  const telefone = req.body.telefone;

  const dataNascimento = moment
    .utc(req.body.dataNascimento, "DD-MM-YYYY", true)
    .format();

  bcrypt
    .hash(senha, 12)
    .then(hash => {
      const encryptedPass = hash;
      return User.create({
        nome: nome,
        email: email,
        senha: encryptedPass,
        cpf: cpf,
        dataNascimento: dataNascimento,
        sexo: sexo,
        telefone: telefone
      });
    })
    .then(user => {
      res.status(201).json({ message: "User Created" });
    })
    .catch(err =>
      res.status(400).json({ message: "Erro ao tentar salvar senha" })
    );
};

exports.getAuthenticatedUser = (req, res) => {
  User.findByPk(req.userId)
    .then(user => {
      if (!user) {
        return res
          .send(500)
          .json({ message: "Erro ao tentar obter o usuário autenticado." });
      }

      res.json({
        message: "Sucesso",
        user: user
      });
    })
    .catch(err => {
      return res
        .send(500)
        .json({ message: "Erro ao tentar obter o usuário autenticado." });
    });
};
