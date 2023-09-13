# Online Bookstore API

## Overview

This is the backend API for an online bookstore. It allows users to browse and search for books, manage their shopping carts, and place orders. Each book has attributes such as title, author, genre, price, and stock quantity. The API handles user authentication, manages user sessions, and provides endpoints for various bookstore functionalities.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Browsing Books](#browsing-books)
  - [Managing Shopping Carts](#managing-shopping-carts)
  - [Placing Orders](#placing-orders)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm (Node Package Manager)
- MySQL Database

### Installation

1. Clone this repository:
    `git clone https://github.com/your-username/online-bookstore-api.git`

2. Change Project Directory
    `cd online-bookstore-api `

3. Install dependencies
    `npm install`

### Configuration

1. Create a .env file in the project root directory and configure the following environment variables:

```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_DATABASE=online_bookstore
JWT_SECRET=your_jwt_secret_key

```
2. Set up your MySQL database and run the SQL script provided in db.sql to create the necessary tables.

3. Start the server:
    `npm start`
The API should now be running on http://localhost:3000 (or your specified port).

## Usage

### Authentication

- Use the /auth/register endpoint to register a new user.
- Use the /auth/login endpoint to authenticate and receive a JWT token.
- Include the JWT token in the Authorization header for protected routes.

### Browsing Books

- Use the /books endpoint to list all available books.
- Use the /books/:bookId endpoint to get details of a specific book by ID.

### Managing Shopping Carts

- Use the /carts/:userId endpoint to view the contents of a user's shopping cart.
- Use the /carts/add endpoint to add a book to the user's shopping cart.
- Use the /carts/clear/:userId endpoint to clear a user's shopping cart.

### Placing Orders

- Use the /orders/place-order endpoint to place an order based on the items in the user's shopping cart.

## API Endpoints

For detailed information on available API endpoints and request/response examples, refer to the API documentation.

## Error Handling

The API includes error handling for various scenarios, providing meaningful error messages and appropriate HTTP status codes.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the Contributing Guidelines.

## License

This project is licensed under the MIT License. See the LICENSE file for details.