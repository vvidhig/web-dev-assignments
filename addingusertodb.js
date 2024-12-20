const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.7";
const client = new MongoClient(url);

async function main() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected successfully to MongoDB!");

    // Specify a database to work with
    const dbName = "SigninExperiment"; // Replace with your database name
    const db = client.db(dbName);

    // Example: List collections in the database
    const collections = await db.collections();
    console.log("Collections:", collections.map((col) => col.collectionName));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Close the connection
    await client.close();
  }
}

main();
