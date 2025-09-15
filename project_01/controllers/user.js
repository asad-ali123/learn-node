const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allData = await User.find({});
  return res.json(allData);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User Not Found.." });
  }
  return res.json(User);
}
async function handleUpdateUserById(req, res) {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.json({ status: "success", user: updated });
}
async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
}

async function handeCreateNewUser(req, res) {
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
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handeCreateNewUser,
};
