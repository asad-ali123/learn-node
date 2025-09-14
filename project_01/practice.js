const express = require("express");
const allData = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 3000;

// middleware
app.use(express.urlencoded({ extended: false }));

// for mobile
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
      ${allData
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

// for brwser like  larg devices
app.get("/api/users", (req, res) => {
  res.json(allData);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = allData.find((i) => i.id === id);
    console.log(user);
    res.json(user ? user : "Sorry!!! This uer is not Available");
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const userindex = allData.findIndex((user) => user.id === id);
    const updateUser = req.body;
    allData[userindex] = { ...allData[userindex], ...updateUser };

    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(allData, null, 2),
      (err) => {
        return res.json({
          status: "success",
          message: "User updated",
          user: allData[userindex],
        });
      }
    );
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

app.post("/api/users", (req, res) => {
  console.log(req.body);
  const body = req.body;
  allData.push({ ...body, id: allData.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(allData), (err, data) => {
    console.log(err);
    return res.json({ status: "success", id: allData.length });
  });
});

app.listen(PORT, () => console.log("server is started at 3000"));
