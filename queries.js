// Import MongoDB client
const { MongoClient } = require('mongodb');

// Setup connection
const uri = "mongodb://127.0.0.1:27017";

async function runQueries() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db("plp_bookstore");
        const books = db.collection("books");

        // 1. Find all books in a specific genre
        console.log("1. Books in 'Science Fiction' genre:");
        const sciFiBooks = await books.find({ genre: "Dystopian" }).toArray();
        sciFiBooks.forEach(book => console.log(` - ${book.title}`));

        // 2. Find books published after a certain year  
        console.log("\n2. Books published after 1950:");
        const recentBooks = await books.find({ published_year: { $gt: 1950 } }).sort({published_year: 1}).toArray();
        recentBooks.forEach(book => console.log(` - ${book.title} (${book.published_year})`));

        // 3. Find books by a specific author
        console.log("\n3. Books by George Orwell:");
        const authorBooks = await books.find({ author: "George Orwell" }).toArray();
        authorBooks.forEach(book => console.log(` - ${book.title}`));

        // 4. Update the price of a specific book
        console.log("\n4. Updating price of 'Animal Farm':");
        const updateResult = await books.updateOne(
            { title: "Animal Farm" },
            { $set: { price: 10.99 } }
        );
        console.log(`Modified ${updateResult.modifiedCount} document(s)`);

        // 5. Delete a book by its title
        console.log("\n5. Deleting 'Moby Dick':");
        const deleteResult = await books.deleteOne({ title: "Moby Dick" });
        console.log(`Deleted ${deleteResult.deletedCount} document(s)`);

    } finally {
        await client.close();
    }
}

runQueries().catch(console.error);