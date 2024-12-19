const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const ALL_USERS = [
    {
      username: "harkirat@gmail.com",
      password: "123",
      name: "harkirat singh",
    },
    {
      username: "raman@gmail.com",
      password: "123321",
      name: "Raman singh",
    },
    {
      username: "priya@gmail.com",
      password: "123321",
      name: "Priya kumari",
    },
  ];

  function userExist(username, password)
  {
    for(let i = 0; i < ALL_USERS.length; i++)
    {
        if(ALL_USERS[i].username === username && ALL_USERS[i].password === password)
            return true;
    }
    return false;
  }

  app.post("/signin", function(req, res){
    let username = req.params.username;
    let password = req.params.password;
    if(!userExist(username, password))
    {
        res.send("User does not exist");
    }
    else
    {
        var token = jwt.sign({username: username, password: password})
    }
  });