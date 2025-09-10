const express = require("express");

// using express  create  handler
const app = express(); //it's works like handler fun 

app.get("/", (req, res) => {
  return res.send("Hello from Home page ");
});

app.get("/about", (req, res) => {
  return res.send(
    "Hello from About" +
      " Hey " +
      req.query.name +
      " your age is " +
      req.query.age
  );
});

app.use((req, res) => {
  res.status(404).send("Page not found 😢");
});

app.listen(3000, () => console.log("Server Started at 3000"));
