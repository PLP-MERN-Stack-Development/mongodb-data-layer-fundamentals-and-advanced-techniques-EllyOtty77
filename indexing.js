const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";

async function runIndexing() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db("plp_bookstore");
        const books = db.collection("books");

        console.log("=== INDEXING PERFORMANCE ===\n");

        // 1. Create single index on title field
        console.log("1. Creating index on title field...");
        await books.createIndex({ title: 1 });
        console.log("✓ Index created on title field\n");

        // 2. Create compound index on author and published_year
        console.log("2. Creating compound index on author and published_year...");
        await books.createIndex({ author: 1, published_year: 1 });
        console.log("✓ Compound index created on author and published_year\n");

        // 3. Demonstrate performance improvement for title search
        console.log("3. Performance comparison - Title search:");
        console.log("Without index:");
        const withoutTitleIndex = await books.find({ title: "Brave New World" }).explain("executionStats");
        console.log(`- Documents examined: ${withoutTitleIndex.executionStats.totalDocsExamined}`);
        console.log(`- Execution time: ${withoutTitleIndex.executionStats.executionTimeMillis}ms`);

        console.log("With index:");
        const withTitleIndex = await books.find({ title: "Brave New World" }).explain("executionStats");
        console.log(`- Documents examined: ${withTitleIndex.executionStats.totalDocsExamined}`);
        console.log(`- Execution time: ${withTitleIndex.executionStats.executionTimeMillis}ms`);
        console.log(`- Index used: ${withTitleIndex.executionStats.executionStages.inputStage?.indexName || 'Yes'}`);

        // 4. Demonstrate performance improvement for author + year search
        console.log("\n4. Performance comparison - Author and year search:");
        console.log("Without compound index:");
        const withoutCompound = await books.find({ 
            author: "George Orwell", 
            published_year: { $gt: 1920 } 
        }).explain("executionStats");
        console.log(`- Documents examined: ${withoutCompound.executionStats.totalDocsExamined}`);
        console.log(`- Execution time: ${withoutCompound.executionStats.executionTimeMillis}ms`);

        console.log("With compound index:");
        const withCompound = await books.find({ 
            author: "George Orwell", 
            published_year: { $gt: 1920 } 
        }).explain("executionStats");
        console.log(`- Documents examined: ${withCompound.executionStats.totalDocsExamined}`);
        console.log(`- Execution time: ${withCompound.executionStats.executionTimeMillis}ms`);
        console.log(`- Index used: ${withCompound.executionStats.executionStages.inputStage?.indexName || 'Yes'}`);

        // 5. List all indexes
        console.log("\n5. Current indexes on books collection:");
        const indexes = await books.indexes();
        indexes.forEach((index, i) => {
            console.log(`${i + 1}. ${index.name}:`, index.key);
        });

    } finally {
        await client.close();
    }
}

runIndexing().catch(console.error);