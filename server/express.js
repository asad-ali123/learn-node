const express = require('express');

// using express  create  handler
const app = express()
app.get("/", (req, res) => {
  return res.send("Hello from Home page ");
});

app.get('/about' , (req , res)=>{
  return res.send('Hello from About' + ' Hey ' +  req.query.name + ' your age is ' + req.query.age)
})


app.listen(3000, () => console.log("Server Started!"));