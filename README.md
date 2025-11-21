# MongoDB Bookstore Project

A Node.js application demonstrating MongoDB data layer fundamentals and advanced techniques including queries, aggregation pipelines, and indexing.

## Prerequisites

- Node.js installed
- MongoDB running locally on `127.0.0.1:27017`
- MongoDB database named `plp_bookstore`

## Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:
```bash
npm init -y
npm install mongodb
```

## Scripts Overview

### 1. Basic Queries (`queries.js`)
- Find books by genre, author, and publication year
- Update book prices
- Delete books by title

**Run:**
```bash
node queries.js
```

### 2. Advanced Queries (`advanced.js`)
- Complex queries with projection and sorting
- Pagination implementation (5 books per page)
- Combined filters (in stock + publication year)

**Run:**
```bash
node advanced.js
```

### 3. Aggregation Pipelines (`aggregation.js`)
- Average book price by genre
- Author with the most books
- Books grouped by publication decade

**Run:**
```bash
node aggregation.js
```

### 4. Indexing Performance (`indexing.js`)
- Creates single and compound indexes
- Demonstrates performance improvements using `explain()`
- Shows query execution statistics

**Run:**
```bash
node indexing.js
```

## Database Schema

The `books` collection uses this document structure:
```javascript
{
  title: String,
  author: String,
  published_year: Number,
  genre: String,
  price: Number,
  pages: Number,
  in_stock: Boolean,
  publisher: String
}
```

## Key MongoDB Features Demonstrated

- **Basic CRUD Operations**: find, update, delete
- **Aggregation Pipeline**: $group, $unwind, $project, $sort
- **Indexing**: Single field and compound indexes
- **Query Optimization**: Using explain() for performance analysis
- **Pagination**: limit() and skip() methods

## Connection Details

All scripts connect to:
- **URI**: `mongodb://127.0.0.1:27017`
- **Database**: `plp_bookstore`
- **Collection**: `books`

## Troubleshooting

If you encounter connection issues:
1. Ensure MongoDB is running: `sc query MongoDB`
2. Use IPv4 address (`127.0.0.1`) instead of `localhost`
3. Check if the `plp_bookstore` database exists

## Expected Output

Each script provides detailed console output showing:
- Query results
- Performance metrics
- Aggregation results
- Index usage statistics
