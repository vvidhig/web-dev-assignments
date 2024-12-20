const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.7";
const client = new MongoClient(url);

async function main() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected successfully to MongoDB!");

    // Specify a database to work with
    const dbName = "SigninExperiment";
    const db = client.db(dbName);

    // Example: List collections in the database
    const collections = await db.collections();
    console.log("Collections:", collections.map((col) => col.collectionName));

    // Define a collection to work with
    const collection = db.collection("Users");

    // Insert multiple users
    await insertUser(collection, "Vidhi Gupta", "vvidhig@gmail.com", "123456");
    await insertUser(collection, "Rahul Gupta", "rgnerd@gmail.com", "123123");
    await insertUser(collection, "Vinayak Gupta", "lalulalu@gmail.com", "12231223");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Close the connection
    await client.close();
  }
}

async function insertUser(collection, name, email, password) {
  try {
    const result = await collection.insertOne({
      name,
      email,
      password,
    });
    console.log("Inserted document ID:", result.insertedId);
  } catch (error) {
    console.error("Error inserting user:", error);
  }
}

main();