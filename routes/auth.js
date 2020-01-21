var express = require("express");
var router = express.Router();

var isAuthMiddleware = require("../middleware/is-auth");

var authController = require("../controllers/auth");

/* POST login a user. */
router.post("/login", authController.login);

/* POST register a new user */
router.post("/register", authController.register);

router.get("/user", isAuthMiddleware, authController.getAuthenticatedUser);

module.exports = router;
