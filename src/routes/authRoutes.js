const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/authController");

router.post("/signup", signup);

// Rota para fazer login
router.post("/login", login);

// Rota para fazer logout
router.post("/logout", logout);

module.exports = router;
