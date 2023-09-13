const db = require('../config/db');

class Book {
  constructor(title, author, genre, price, stock_quantity) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.price = price;
    this.stock_quantity = stock_quantity;
  }

  static getAll(callback) {
    db.query('SELECT * FROM books', (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static getById(bookId, callback) {
    db.query('SELECT * FROM books WHERE id = ?', [bookId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  }
}

module.exports = Book;
