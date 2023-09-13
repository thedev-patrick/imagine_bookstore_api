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