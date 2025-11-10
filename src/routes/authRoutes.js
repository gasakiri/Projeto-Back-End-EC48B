const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/authController");

// Rota para fazer login
router.post("/login", login);

// Rota para fazer logout
router.post("/logout", logout);

module.exports = router;
