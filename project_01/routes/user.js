const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handeCreateNewUser,
} = require("../controllers/user");

const router = express.Router();
// get all users and  create new
router.route("/").get(handleGetAllUsers).post(handeCreateNewUser);

// get , patch , delete
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
