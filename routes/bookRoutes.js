const express = require("express");

const Book = require("../models/bookModel");

const router = express.Router();

// Require Controllers
const { getBooks, getBook, createBook , editBook, deleteBook} = require("../controllers/bookController");

//Get entire Records
router.get("/", getBooks)

//Get single Records
router.get("/:id", getBook)

// Create Record
router.post("/", createBook)

// Update Record
router.put("/:id", editBook)

// Delete Record
router.delete("/:id", deleteBook)

module.exports = router;
