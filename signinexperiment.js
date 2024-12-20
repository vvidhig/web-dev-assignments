const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const app = express();

const port = 8080;
const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.7";
const client = new MongoClient(url);

let db, collection;
app.use(bodyParser.json());

async function connectDB()
{
    try
    {
        await client.connect();
        console.log("Connected to MongoDB!");
        db = client.db("SigninExperiment");
        collection = db.collection("Users");
    }
    catch(err)
    {
        console.log("Error connecting to MongoDB");
    }
}

app.post("/addUsers", async function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if(!name || !email || !password)
    {
        return res.status(400).json({msg: "Please add the data correctly"});
    }
    try
    {
        const existuser = await collection.findOne({ email });
        if(existuser)
        {
            return res.status(409).json({msg: "User already exists"});
        }
        const newuser = await collection.insertOne({name, email, password});
        return res.status(201).json({msg:"User added successfully", UserActivationId : newuser.insertedId});
    }
    catch(err)
    {
        return res.status(500).json({msg: err.message});    
    }
});

app.get("/getUsers", async function(req, res) {
    const email = req.headers.email;
    if(!email)
    {
        return res.status(400).json({msg: "Please pass the email correctly"});
    }
    try
    {
        const existuser = await collection.findOne({ email });
        return res.json(existuser);
    }
    catch(err)
    {
        return res.status(500).json({msg: err.message});
    }
});

app.listen(port, async () => {
    console.log("Listening on port ", port);
    await connectDB();
});
