const express = require("express");
const User = require("../models/user");

const router = express.Router();

function userRouter() {
  router.get("/", async (req, res) => {
    console.log("hhh");
    const allData = await User.find({});
    res.json(allData);
  });

  // get , patch , delete
  router
    .route("/:id")
    .get(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User Not Found.." });
      }
      return res.json(User);
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
  router.post("/", async (req, res) => {
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
}
module.exports = { userRouter };
