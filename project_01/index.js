const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { type } = require("os");
const { timeStamp } = require("console");
const PORT = 3000;

// connection mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/first-db")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log("Mongo Error", err));

// schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    job_title: {
      type: String,
    },
  },
  { timeStamp: true }
);

// model

const User = mongoose.model("user", userSchema);
// middleware
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res, next) => {
  // create a log file
  fs.appendFile(
    "log.text",
    `${new Date().toLocaleString()}: ${req.method} ${req.ip} ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});

// Routes
// for html render
app.get("/users", (req, res) => {
  const html = `
    <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Job Title</th>
      </tr>
    </thead>
    <tbody>
      ${users
        .map((user) => {
          return `
          <tr>
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.job_title}</td>
          </tr>
          `;
        })
        .join("")}
    </tbody>
  </table>
  
    `;
  res.send(html);
});

// Restfull api

// get all  users
app.get("/api/users", (req, res) => {
  res.setHeader("X-MyHeader", "Asad Ali"); //its custom header
  // Always add X to  custom headers its a good practice
  console.log(req.header);
  return res.json(users);
});

// get single user  by id  we use this  for multiple purpose line marge these like this
// its not working right now
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      res.status(404).json({ error: "User not found Try again" });
    }
    res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const userId = users.find((user) => user.id === id);
    const updateUser = req.body;
    users[userId] = { ...users[userId], ...updateUser };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null), (err) => {
      return res.json({
        status: "success",
        message: "User updated",
        user: users[userId],
      });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = allData.findIndex((user) => user.id === id);

    const deletedUser = allData.splice(userIndex, 1)[0];
    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(allData, null, 2),
      (err, data) => {
        return res.json({
          status: "success",
          message: "The user is deleted successfully",
          deletedUser: deletedUser,
        });
      }
    );
  });

app.post("/api/users", async (req, res) => {
  // create a new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    res.status(400).json({ message: "All fields are required" });
  }

  // const addUser = users.push({
  //   id: users.length + 1,
  //   first_name: body.first_name,
  //   last_name: body.last_name,
  //   email: body.email,
  //   gender: body.gender,
  //   job_title: body.job_title,
  // });
  // users.push({ id: users.length + 1, ...body });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "success", id: users.length });
  // });
  await User.create({
    first_name: body.first_name,
    first_name: body.first_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  res.status(201).json({ message: "User created successfuly" });
});

app.listen(PORT, () => console.log(`Server is Started at ${PORT}`));
