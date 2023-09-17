const pool = require('../config/db');

class Book {
  constructor(title, author, genre, price, stock_quantity) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.price = price;
    this.stock_quantity = stock_quantity;
  }
  static createBook(bookData, callback) {
    const { title, author } = bookData;
  
    // Check if a book with the same title and author already exists
    const checkQuery = 'SELECT * FROM books WHERE title = $1 AND author = $2';
    const checkValues = [title, author];
  
    pool.query(checkQuery, checkValues, (checkErr, checkResult) => {
      if (checkErr) {
        return callback(checkErr, null);
      }
  
      if (checkResult.rows.length > 0) {
        // A book with the same title and author already exists
        const error = new Error('Book with the same title and author already exists');
        return callback(error, null);
      }
  
      // No duplicate books found, proceed with book creation
      const insertQuery = 'INSERT INTO books (title, author, genre, price, stock_quantity) VALUES ($1, $2, $3, $4, $5)';
      const insertValues = [title, author, bookData.genre, bookData.price, bookData.stock_quantity];
  
      pool.query(insertQuery, insertValues, (err, result) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, result); // Return the result of the INSERT query
      });
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
