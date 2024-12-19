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