const express = require("express");
const router = express.Router();
const { register, login, usernameExists } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/exists", usernameExists);

module.exports = router;
