const Book = require("../models/bookModel")


// Get All Data
const getBooks = async (req, res) => {
  try {
    const bookData = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Get Single Data
const getBook = async (req, res) => {
  try {
    const id = req.params.id
    const bookData = await Book.findById(id);
     if (!bookData) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const book = await newBook.save();
    res.status(201).json(book)
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// const update book
const editBook = async (req, res) => {
  try {
    const id = req.params.id;
    const bookData = await Book.findByIdAndUpdate({ _id: id }, req.body, { 
      new: true ,
    });
    res.status(200).json(bookData)
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// const Delete book
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const bookData = await Book.findByIdAndDelete({ _id: id })
    res.status(200).json(bookData)
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  editBook,
  deleteBook
}