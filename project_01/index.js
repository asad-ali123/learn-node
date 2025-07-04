const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const PORT = 3000;
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
    // edit user with id
    return res.json({ status: panding });
  })
  .delete((req, res) => {
    // delete user with id
    return res.json({ status: panding });
  });

app.post("/api/users", (rrq, res) => {
  // create a new user
  return res.json({ status: panding });
});

app.listen(PORT, () => console.log(`Server is Started at ${PORT}`));
