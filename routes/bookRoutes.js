const express = require("express");
const { body, param } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateMiddleware');
const bookController = require('../controllers/bookController');
const router = express.Router();



//****************Public Routes**************************

//Get entire Records
router.get("/", bookController.getBooks)

//Get single Records
router.get("/:id", 
     [param('id').isMongoId().withMessage('Invalid book id')],
  validateRequest,
  bookController.getBook
);

//*************Protected Routes *****************

// Create Record
router.post("/",  auth,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('author').trim().notEmpty().withMessage('Author is required'),
    body('genre').trim().notEmpty().withMessage('Genre is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('inStock').optional().isBoolean().withMessage('inStock must be boolean')
  ],
  validateRequest,
  bookController.createBook
);

// Update Record
router.put("/:id", auth,
  [
    param('id').isMongoId().withMessage('Invalid book id'),
    body('title').optional().trim(),
    body('author').optional().trim(),
    body('genre').optional().trim(),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('inStock').optional().isBoolean().withMessage('inStock must be boolean')
  ],
  validateRequest,
  bookController.editBook
);

// Delete Record
router.delete("/:id", auth,
  [param('id').isMongoId().withMessage('Invalid book id')],
  validateRequest,
  bookController.deleteBook
);

module.exports = router;
