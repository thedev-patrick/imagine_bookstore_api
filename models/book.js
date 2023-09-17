const pool = require('../config/db');

class Book {
  constructor(title, author, genre, price, stock_quantity) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.price = price;
    this.stock_quantity = stock_quantity;
  }
  static create(bookData, callback) {
    
    const { title, author, genre, price, stock_quantity } = bookData;

    // Insert the new book into the 'books' table
    const query = 'INSERT INTO books (title, author, genre, price, stock_quantity) VALUES ($1, $2, $3, $4, $5)';
    const values = [title, author, genre, price, stock_quantity];

    pool.query(query, values, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result); // Return the result of the INSERT query
    });
  }
  
  static getAll(callback) {
    pool.query('SELECT * FROM books', (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.rows); // Access the rows property to get the result data
    });
  }

  static getById(bookId, callback) {
    pool.query('SELECT * FROM books WHERE id = $1', [bookId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.rows[0]); // Access the rows property to get the result data
    });
  }
}

module.exports = Book;
