const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";

async function runAdvancedQueries() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db("plp_bookstore");
        const books = db.collection("books");

        console.log("=== ADVANCED QUERIES ===\n");

        // 1. Books in stock and published after 2010
        console.log("1. Books in stock and published after 2010:");
        const inStockRecent = await books.find(
            { in_stock: true, published_year: { $gt: 2010 } },
            { title: 1, author: 1, price: 1, _id: 0 }
        ).toArray();
        console.log(inStockRecent);

        // 2. Sort by price ascending
        console.log("\n2. Books sorted by price (ascending):");
        const priceAsc = await books.find(
            {}, 
            { title: 1, author: 1, price: 1, _id: 0 }
        ).sort({ price: 1 }).toArray();
        console.log(priceAsc);

        // 3. Sort by price descending
        console.log("\n3. Books sorted by price (descending):");
        const priceDesc = await books.find(
            {}, 
            { title: 1, author: 1, price: 1, _id: 0 }
        ).sort({ price: -1 }).toArray();
        console.log(priceDesc);

        // 4. Pagination - Page 1
        console.log("\n4. Pagination - Page 1:");
        const page1 = await books.find(
            {}, 
            { title: 1, author: 1, price: 1, _id: 0 }
        ).sort({ title: 1 }).limit(5).skip(0).toArray();
        console.log(page1);

        // 5. Pagination - Page 2
        console.log("\n5. Pagination - Page 2:");
        const page2 = await books.find(
            {}, 
            { title: 1, author: 1, price: 1, _id: 0 }
        ).sort({ title: 1 }).limit(5).skip(5).toArray();
        console.log(page2);

    } finally {
        await client.close();
    }
}

runAdvancedQueries().catch(console.error);