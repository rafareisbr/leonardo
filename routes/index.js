var express = require("express");

var authRouter = require("./auth");
var isAuthMiddleware = require("../middleware/is-auth");

var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.json({ message: "Server is Working." });
});

router.get("/resources", isAuthMiddleware, (req, res) => {
  res.json({ message: "Acesso autorizado mediante confirmação do Token" });
});

router.use("/auth", authRouter);

module.exports = router;
