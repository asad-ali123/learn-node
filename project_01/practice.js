const express = require("express");
// const allData = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

// connection of mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/first-db")
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log("Mongo error", err));

// schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

// modal

const User = new mongoose.model("user", userSchema);
// middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const date = new Date().toLocaleString();
  fs.appendFile(
    "./log.txt",
    `\n ${date}  ${req.ip}  ${req.path} ${req.method}`,
    (err, data) => {
      next();
    }
  );
});

// for mobile
app.get("/users", async (req, res) => {
  const allData = await User.find({});
  const html = `
    <table border="1">
    <thead>
      <tr>
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
            <td>${user.firstName || user.first_name}</td>
            <td>${user.lastName || user.last_name}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.jobTitle}</td>
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
app.get("/api/users", async (req, res) => {
  const allData = await User.find({});
  res.json(allData);
});
// get , patch , delete
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User Not Found.." });
    }
    return res.json(user);
  })
  .patch(async (req, res) => {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json({ status: "success", user: updated });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
  });

// post / create user
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ error: "All fields are Required.....!" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log(result);
  return res.status(201).json({ message: "success" });
});

app.listen(PORT, () => console.log("server is started at 3000"));
