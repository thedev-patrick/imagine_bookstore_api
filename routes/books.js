const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const verifyToken = require('../routes/middleware/verifyToken');

router.use(verifyToken);

router.get('/', (req, res) => {
  // Get all books
  Book.getAll((err, books) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching books' });
    }
    res.status(200).json(books);
  });
});

router.get('/:bookId', (req, res) => {
  const bookId = req.params.bookId;

  // Get book by ID
  Book.getById(bookId, (err, book) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching book' });
    }
    res.status(200).json(book);
  });
});

router.post('/', (req, res) => {
  const { title, author, genre, price, stock_quantity } = req.body;

  // Create a new book object
  const newBook = new Book(title, author, genre, price, stock_quantity);

  // Use the createBook method to add the new book to the database
  Book.create(newBook, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating book' });
    }
    res.status(201).json({ message: 'Book created successfully' });
  });
});

module.exports = router;
