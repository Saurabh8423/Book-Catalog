const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middleware/validateMiddleware');
const userController = require("../controllers/userController")

//Signup User**************************

router.post("/register",
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ],
    validateRequest,
    userController.register
);

//login user**********************
router.post("/login",
    [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    validateRequest,
    userController.login
);


module.exports = router;
