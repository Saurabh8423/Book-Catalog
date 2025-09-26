const express = require("express");
const authUser = require("../middleware/authMiddleware");
const router = express.Router();

// Require Controllers
const { getBooks, getBook, createBook , editBook, deleteBook} = require("../controllers/bookController");

//Get entire Records
router.get("/", getBooks)

//Get single Records
router.get("/:id", getBook)

// Create Record
router.post("/", authUser, createBook)

// Update Record
router.put("/:id",authUser, editBook)

// Delete Record
router.delete("/:id",authUser, deleteBook)

module.exports = router;
