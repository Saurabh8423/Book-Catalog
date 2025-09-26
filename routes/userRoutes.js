const express = require("express");
const router = express.Router();

const {register, login}= require("../controllers/userController")

//Signup User**************************

router.post("/register", register);

//login user**********************
router.post("/login", login);


module.exports =router;
