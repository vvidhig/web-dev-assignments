const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const jwtPassword = "123456";

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
        {
            console.log(ALL_USERS[i].username, ALL_USERS[i].password);
            return true;
        }
    }
    return false;
  }

  app.post("/signin", function(req, res){
    let username = req.body.username;
    let password = req.body.password;
    if(!userExist(username, password))
    {
        return res.status(403).json({msg :"User does not exist"});
    }
    else
    {
        var token = jwt.sign({username: username, password: password}, jwtPassword);
        return res.json({token,});
    }
  });

  app.get("/users", function(req, res){
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        const password = decoded.password;
        res.send({"username": username, "password": password});
    } 
    catch (err) {
        return res.status(403).json({
         msg: "Invalid token",
        });
    }
    });

app.listen(8080, () => {
    console.log("listening on port 8080");
});