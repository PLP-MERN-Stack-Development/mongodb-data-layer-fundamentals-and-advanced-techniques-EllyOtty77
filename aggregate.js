const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";

async function runAggregations() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db("plp_bookstore");
        const books = db.collection("books");

        console.log("=== AGGREGATION PIPELINES ===\n");

        // 1. Average price by genre
        console.log("1. Average price by genre:");
        const avgPriceByGenre = await books.aggregate([
            { $unwind: "$genre" },
            { $group: { 
                _id: "$genre", 
                avgPrice: { $avg: "$price" }
            }},
            { $sort: { avgPrice: -1 } }
        ]).toArray();
        console.log(avgPriceByGenre);

        // 2. Author with most books
        console.log("\n2. Author with most books:");
        const authorMostBooks = await books.aggregate([
            { $group: { 
                _id: "$author", 
                bookCount: { $sum: 1 }
            }},
            { $sort: { bookCount: -1 } },
            { $limit: 1 }
        ]).toArray();
        console.log(authorMostBooks);

        // 3. Books by publication decade
        console.log("\n3. Books by publication decade:");
        const booksByDecade = await books.aggregate([
            { $project: {
                title: 1,
                author: 1,
                published_year: 1,
                decade: { 
                    $subtract: [
                        "$published_year", 
                        { $mod: ["$published_year", 10] }
                    ]
                }
            }},
            { $group: {
                _id: "$decade",
                bookCount: { $sum: 1 },
                books: { $push: "$title" }
            }},
            { $sort: { _id: 1 } }
        ]).toArray();
        console.log(booksByDecade);

    } finally {
        await client.close();
    }
}

runAggregations().catch(console.error);