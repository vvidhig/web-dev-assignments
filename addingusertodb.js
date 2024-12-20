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

    // 1. Create a new user
    // await insertUser(collection, "Vidhi Gupta", "vvidhig@gmail.com", "123456");
    // await insertUser(collection, "Rahul Gupta", "rgnerd@gmail.com", "123123");
    // await insertUser(collection, "Vinayak Gupta", "lalulalu@gmail.com", "12231223");

    // 2. Finding all documents
    // await fetchUsers(collection);

    // 3. Finding specific documents
    // await findUser(collection, "vvidhig@gmail.com");
    // await findUser(collection, "rgnerd@gmail.com");
    // await findUser(collection, "lalulalu@gmail.com");

    // 4. Updating documents
    // await updateUser(collection)

    // 5. Deleting a document
    await deleteUser(collection);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Close the connection
    await client.close();
  }
}

async function fetchUsers(collection) {
  const users = await collection.find({}).toArray();
  console.log("Users:", users);
}

async function findUser(collection, e) {
  const user = await collection.findOne({ email: e });
  console.log("Found User:", user);
}

async function updateUser(collection) {
  const result = await collection.updateOne(
    { email: "vvidhig@gmail.com" }, // Filter
    { $set: { password: "417417" } }           // Update
  );
  console.log("Matched Count:", result.matchedCount);
  console.log("Modified Count:", result.modifiedCount);
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

async function deleteUser() {
  const result = await collection.deleteOne({ email: "lalulalu@gmail.com" });
  console.log("Deleted Count:", result.deletedCount);
}

main();
