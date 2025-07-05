const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { json } = require("stream/consumers");
const PORT = 3000;

// middleware
app.use(express.urlencoded({ extended: false }));
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
  return res.json(users);
});

// get single user  by id  we use this  for multiple purpose line marge these like this
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
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
    // delete user with id
    return res.json({ status: "panding" });
  });

app.post("/api/users", (req, res) => {
  // create a new user
  const body = req.body;
  // const addUser = users.push({
  //   id: users.length + 1,
  //   first_name: body.first_name,
  //   last_name: body.last_name,
  //   email: body.email,
  //   gender: body.gender,
  //   job_title: body.job_title,
  // });
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server is Started at ${PORT}`));
