// const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/signinexperiment")

// const User = mongoose.model("User", {
//     name: String,
//     username: String,
//     password: String,
//   });

// const user = new User({"name": "Vidhi Gupta", "username": "vvidhig@gmail.com", "password": "123456"});
// user.save();

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017"; // Adjust this to your connection string
const dbName = "SigninExperiment";

MongoClient.connect(url, function (err, client) {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }
  const db = client.db(dbName);
  db.dropDatabase(function (err, result) {
    if (err) {
      console.error("Error dropping database:", err);
      return;
    }
    console.log("Database dropped:", dbName);
  });
});
