const express = require('express');
const router = express.Router();
const Book = require('../models/book');

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

module.exports = router;
